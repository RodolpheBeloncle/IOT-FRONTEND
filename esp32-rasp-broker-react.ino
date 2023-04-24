#include <WiFi.h>
// #include "WiFiClientSecure.h"
#include "WiFiClient.h"
#include <PubSubClient.h>
#include <Arduino.h>
#include "credentials.h"
#include "DHT.h"

#define DHTPIN 4 // Connect Data pin of DHT to D2
int led = 5;     // Connect LED to D5
bool ledState = LOW;
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);

long lastMsg = 0;
char msg[50];
int value = 0;

// WiFi credentials
const char *ssid = SECRET_SSID;
const char *password = SECRET_PASS;

// MQTT Broker credentials
const char *mqtt_broker = MQTT_IP_ADRESS;
const char *topiclight = TOPICLIGHT;
const char *topictemp = TOPICTEMP;
const char *topichum = TOPICHUM;
const char *mqtt_username = SECRET_MQTT_USERNAME;
const char *mqtt_password = SECRET_MQTT_PASSWORD;
const int mqtt_port = MQTT_PORT;

// Set ssl certificate
const char *root_ca = CA_CRT;
const char *server_cert = SERVER_CERT;
const char *server_key = SERVER_KEY;

// WiFiClientSecure espClient;
WiFiClient espClient;
PubSubClient client(espClient);

unsigned long lastPublish = 0;
const unsigned long PUBLISH_INTERVAL = 5000; // publish interval in milliseconds

void setup()
{
  delay(10);
  // Set software serial baud to 115200;
  Serial.begin(115200);

  dht.begin();
  pinMode(led, OUTPUT);
  // connecting to a WiFi network
  // We start by connecting to a WiFi network
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED)
  {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());

  // Connecting to a mqtt broker width ssl certification
  //  espClient.setCACert(root_ca);
  //  espClient.setCertificate(server_cert);  // for client verification
  //  espClient.setPrivateKey(server_key);    // for client verification
  client.setServer(mqtt_broker, mqtt_port);
  client.setCallback(callback);

  while (!client.connected())
  {
    Serial.print("Attempting MQTT connection...");
    // Attempt to connect
    if (client.connect("ESP32Client", mqtt_username, mqtt_password))
    {
      Serial.println("connected");
      // Subscribe
      client.subscribe("home/#");
    }
    else
    {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      // Wait 5 seconds before retrying
      delay(5000);
    }
  }
  // publish and subscribe
  // client.publish(topic, "Hi rasp-broker I'm ESP32 ^^");
  // Sensor readings may also be up to 2 seconds 'old' (its a very slow sensor)

  // Read temperature as Celsius (the default)
  float t = dht.readTemperature();
  // Publish an MQTT message on topic esp32/dht/temperature
  uint16_t packetIdPub1 = client.publish(topictemp, String(t).c_str());
  Serial.printf("Publishing on topic %s at QoS 0, packetId: %i", topictemp, packetIdPub1);
  Serial.printf("Message: %.2f \n", t);

  // Publish an MQTT message on topic esp32/dht/humidity
  float h = dht.readHumidity();
  uint16_t packetIdPub2 = client.publish(topichum, String(h).c_str());
  Serial.printf("Publishing on topic %s at QoS 1, packetId %i: ", topichum, packetIdPub2);
  Serial.printf("Message: %.2f \n", h);

  // Initialize DHT sensor
  dht.begin();
}

void callback(char *topic, byte *payload, unsigned int length)
{
  Serial.print("Message arrived in topic: ");
  Serial.println(topic);
  Serial.print("Message:");
  String messageTemp;
  for (int i = 0; i < length; i++)
  {
    Serial.print((char)payload[i]);
    messageTemp += (char)payload[i];
  }
  Serial.println();
  Serial.println("-----------------------");
  // callback event listener when message arrive do so
  if (String(topic) == "home/light")
  {
    if (messageTemp == "on")
    {
      digitalWrite(led, HIGH);
      ledState = HIGH;
      Serial.println("LED on");
    }
    else if (messageTemp == "off")
    {
      digitalWrite(led, LOW);
      ledState = LOW;
      Serial.println("LED off");
    }
  }
}

void sensorUpdate()
{
  // Reading temperature or humidity takes about 250 milliseconds!
  // Sensor readings may also be up to 2 seconds 'old' (its a very slow sensor)
  float h = dht.readHumidity();
  // Read temperature as Celsius (the default)
  float t = dht.readTemperature();
  // Read temperature as Fahrenheit (isFahrenheit = true)
  float f = dht.readTemperature(true);

  // Publish the temperature and humidity readings to MQTT topics

  // Check if any reads failed and exit early (to try again).
  if (isnan(h) || isnan(t) || isnan(f))
  {
    Serial.println(F("Failed to read from DHT sensor!"));
    return;
  }

  // Publish an MQTT message on topic esp32/dht/temperature
  uint16_t packetIdPub1 = client.publish(topictemp, String(t).c_str());
  Serial.printf("Publishing on topic %s at QoS 0, packetId: %i ", topictemp, packetIdPub1);
  Serial.printf("Temperature Message: %.2f \n", t);

  // Publish an MQTT message on topic esp32/dht/humidity
  uint16_t packetIdPub2 = client.publish(topichum, String(h).c_str());
  Serial.printf("Publishing on topic %s at QoS 0, packetId %i: ", topichum, packetIdPub2);
  Serial.printf("Humidity Message: %.2f \n", h);

  client.subscribe("home/#");

  Serial.print(F("Humidity: "));
  Serial.print(h);
  Serial.print(F("%  Temperature: "));
  Serial.print(t);
  Serial.print(F("C  ,"));

  // publish every 5 seconds
  delay(5000);
}

void reconnect()
{
  // Loop until we're reconnected
  while (!client.connected())
  {
    Serial.print("Attempting MQTT connection...");
    // Attempt to connect
    if (client.connect("ESP32Client", mqtt_username, mqtt_password))
    {
      Serial.println("connected");
      // Subscribe
      client.subscribe("home/#");
    }
    else
    {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      // Wait 5 seconds before retrying
      delay(5000);
    }
  }
}

void loop()
{

  if (!client.connected())
  {
    reconnect();
  }

  unsigned long currentMillis = millis();
  if (currentMillis - lastPublish >= PUBLISH_INTERVAL)
  {
    float temperature = dht.readTemperature();
    float humidity = dht.readHumidity();
    if (isnan(temperature) || isnan(humidity))
    {
      Serial.println("Failed to read data from DHT sensor");
      return;
    }
    Serial.print("Temperature: ");
    Serial.print(temperature);
    Serial.print(" *C  Humidity: ");
    Serial.print(humidity);
    Serial.println(" %");

    char tempStr[6];
    char humStr[6];
    dtostrf(temperature, 5, 2, tempStr);
    dtostrf(humidity, 5, 2, humStr);

    client.publish(topictemp, tempStr);
    client.publish(topichum, humStr);

    lastPublish = currentMillis;
  }

  client.loop();

  long now = millis();
  if (now - lastMsg > 5000)
  {
    lastMsg = now;
  }
