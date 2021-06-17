import RPi.GPIO as GPIO
from time import strftime, sleep, time
import os
from neopixel import *
import _rpi_ws281x as ws
from random import randrange

# LED strip configuration:
LED_COUNT      = 16      # Number of LED pixels.
LED_PIN        = 12      # pin 32 BOARD
#LED_PIN        = 18     # pin 12 BOARD
LED_FREQ_HZ    = 800000  # LED signal frequency in hertz (usually 800khz)
LED_DMA        = 10      # DMA channel to use for generating signal (try 10)
LED_INVERT     = False   # True to invert the signal (when using NPN transistor level shift)
LED_CHANNEL    = 0       # set to '1' for GPIOs 13, 19, 41, 45 or 53

def GPIOSetup():
    GPIO.setmode(GPIO.BOARD)
    GPIO.setwarnings(False)


# Define functions which animate LEDs in various ways.

def colorWipe(m_strip, color, wait_ms=50):
    for i in range(m_strip.numPixels()):
        m_strip.setPixelColor(i, color)
        m_strip.show()
        sleep(wait_ms/1000.0)

def theaterChase(m_strip, color, wait_ms=50, iterations=10):
    for j in range(iterations):
        for q in range(3):
            for i in range(0, m_strip.numPixels(), 3):
                m_strip.setPixelColor(i+q, color)
            m_strip.show()
            sleep(wait_ms/1000.0)
            for i in range(0, m_strip.numPixels(), 3):
                m_strip.setPixelColor(i+q, 0)

def wheel(pos):
    if pos < 85:
        return Color(pos * 3, 255 - pos * 3, 0)
    elif pos < 170:
        pos -= 85
        return Color(255 - pos * 3, 0, pos * 3)
    else:
        pos -= 170
        return Color(0, pos * 3, 255 - pos * 3)

def rainbow(m_strip, wait_ms=20, iterations=1):
    for j in range(256*iterations):
        for i in range(m_strip.numPixels()):
            m_strip.setPixelColor(i, wheel((i+j) & 255))
        m_strip.show()
        sleep(wait_ms/1000.0)

def rainbowCycle(m_strip, wait_ms=20, iterations=5):
    for j in range(256*iterations):
        for i in range(m_strip.numPixels()):
            m_strip.setPixelColor(i, wheel((int(i * 256 / m_strip.numPixels()) + j) & 255))
        m_strip.show()
        sleep(wait_ms/1000.0)

def theaterChaseRainbow(m_strip, wait_ms=50):
    for j in range(256):
        for q in range(3):
            for i in range(0, m_strip.numPixels(), 3):
                m_strip.setPixelColor(i+q, wheel((i+j) % 255))
            m_strip.show()
            sleep(wait_ms/1000.0)
            for i in range(0, m_strip.numPixels(), 3):
                m_strip.setPixelColor(i+q, 0)


#Use one of the declared fuction

def changeColor(G,R,B,LED_BRIGHTNESS):
    # Create NeoPixel object with appropriate configuration.
    strip = Adafruit_NeoPixel(LED_COUNT, LED_PIN, LED_FREQ_HZ, LED_DMA, LED_INVERT, LED_BRIGHTNESS, LED_CHANNEL)
    strip.begin()
    colorWipe(strip, Color(G,R,B))
    

def runChase():
    # Create NeoPixel object with appropriate configuration.
    strip = Adafruit_NeoPixel(LED_COUNT, LED_PIN, LED_FREQ_HZ, LED_DMA, LED_INVERT, 255, LED_CHANNEL)
    strip.begin()
    for k in range(86400):
        colorWipe(strip, Color(randrange(255),randrange(255),randrange(255)))
        sleep(2)
    
    
