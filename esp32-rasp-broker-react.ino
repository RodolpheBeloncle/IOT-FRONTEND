
#include <WiFi.h>
#include "WiFiClientSecure.h"
#include <PubSubClient.h>
#include <Arduino.h>
#include "credentials.h"
#include "DHT.h"

#define DHTPIN 4  // Connect Data pin of DHT to D2
int led = 5;      // Connect LED to D5
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);

long lastMsg = 0;
char msg[50];
int value = 0;


// WiFi credentials
const char* ssid = SECRET_SSID;
const char* password = SECRET_PASS;

// MQTT Broker credentials
const char* mqtt_broker = MQTT_IP_ADRESS;
const char* topic = TOPIC;
const char* topictemp = TOPICTEMP;
const char* mqtt_username = SECRET_MQTT_USERNAME;
const char* mqtt_password = SECRET_MQTT_PASSWORD;
const int mqtt_port = MQTT_PORT ;

// Set ssl certificate
const char* root_ca =  CA_CRT;
const char* server_cert = SERVER_CERT;
const char* server_key  = SERVER_KEY;

WiFiClientSecure espClient;
PubSubClient client(espClient);

void setup() {
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

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());

  //Connecting to a mqtt broker width ssl certification
  espClient.setCACert(root_ca);
  espClient.setCertificate(server_cert);  // for client verification
  espClient.setPrivateKey(server_key);    // for client verification
  client.setServer(mqtt_broker, mqtt_port);
  client.setCallback(callback);

  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    // Attempt to connect
    if (client.connect("ESP32Client",mqtt_username,mqtt_password)) {
      Serial.println("connected");
      // Subscribe
      client.subscribe(topic);
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      // Wait 5 seconds before retrying
      delay(5000);
    }
  }
  // publish and subscribe
  client.publish(topic, "Hi rasp-broker I'm ESP32 ^^");
  // Sensor readings may also be up to 2 seconds 'old' (its a very slow sensor)

  // Read temperature as Celsius (the default)
  float t = dht.readTemperature();
  // Publish an MQTT message on topic esp32/dht/temperature
  uint16_t packetIdPub1 = client.publish(topic, String(t).c_str());
  Serial.printf("Publishing on topic %s at QoS 1, packetId: %i", topic, packetIdPub1);
  Serial.printf("Message: %.2f \n", t);

  // Publish an MQTT message on topic esp32/dht/humidity
  float h = dht.readHumidity();
  uint16_t packetIdPub2 = client.publish(topic, String(h).c_str());
  Serial.printf("Publishing on topic %s at QoS 1, packetId %i: ", topic, packetIdPub2);
  Serial.printf("Message: %.2f \n", h);

  client.subscribe(topic);
}

void callback(char *topic, byte *payload, unsigned int length) {
  Serial.print("Message arrived in topic: ");
  Serial.println(topic);
  Serial.print("Message:");
  String messageTemp;
  for (int i = 0; i < length; i++) {
    Serial.print((char)payload[i]);
    messageTemp += (char)payload[i];
  }
  Serial.println();
  Serial.println("-----------------------");

  if (String(topic) == "temp") {
    sensorUpdate();
    Serial.print("Changing output to ");
   
  } else if (String(topic) == "test") {
   if (messageTemp == "on") {
      Serial.println("on");
      digitalWrite(led, HIGH);
    } else if (messageTemp == "off") {
      Serial.println("off");
      digitalWrite(led, LOW);
    }
  }
}

void sensorUpdate() {
  // Reading temperature or humidity takes about 250 milliseconds!
  // Sensor readings may also be up to 2 seconds 'old' (its a very slow sensor)
  float h = dht.readHumidity();
  // Read temperature as Celsius (the default)
  float t = dht.readTemperature();
  // Read temperature as Fahrenheit (isFahrenheit = true)
  float f = dht.readTemperature(true);

  // Check if any reads failed and exit early (to try again).
  if (isnan(h) || isnan(t) || isnan(f)) {
    Serial.println(F("Failed to read from DHT sensor!"));
    return;
  }

  // Publish an MQTT message on topic esp32/dht/temperature
  // uint16_t packetIdPub1 = client.publish(topic, String(t).c_str());
  // Serial.printf("Publishing on topic %s at QoS 1, packetId: %i", topic, packetIdPub1);
  // Serial.printf("Message: %.2f \n", t);

  // // Publish an MQTT message on topic esp32/dht/humidity
  uint16_t packetIdPub2 = client.publish(topictemp, String(h).c_str());
  Serial.printf("Publishing on topic %s at QoS 1, packetId %i: ", topictemp, packetIdPub2);
  Serial.printf("Message: %.2f \n", h);

  client.subscribe(topictemp);

  Serial.print(F("Humidity: "));
  Serial.print(h);
  Serial.print(F("%  Temperature: "));
  Serial.print(t);
  Serial.print(F("C  ,"));
  Serial.print(f);
  Serial.println(F("F  "));

  delay(100000);
}

void reconnect() {
  // Loop until we're reconnected
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    // Attempt to connect
    if (client.connect("ESP32Client",mqtt_username,mqtt_password)) {
      Serial.println("connected");
      // Subscribe
      client.subscribe(topic);
      client.subscribe(topictemp);
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      // Wait 5 seconds before retrying
      delay(5000);
    }
  }
}

void loop() {

  if (!client.connected()) {
    reconnect();
  }
  client.loop();
  long now = millis();
  if (now - lastMsg > 5000) {
    lastMsg = now;
  }

}
