#Benax ColorLab Project

Step 1: Look for updates and then install them
sudo apt update && sudo apt upgrade -y

Step 2: Install Apache2 and PHP7
sudo apt-get install -y apache2 php7.0 libapache2-mod-php7.0
sudo chmod -R 777 /var/www/
cd /var/www/html/

Step 3: Clone benax-colorlab from remote Github
unzip benax-colorlab.zip 
rm benax-colorlab.zip 
mv index.html index.html.old



Step 4: Install NeoPixel
cd server/
git clone https://github.com/jgarff/rpi_ws281x.git && cd rpi_ws281x && sudo apt-get install scons && sudo apt-get install build-essential python-dev git scons swig -y && scons && cd python && sudo python setup.py install && reboot


Step 5: Change Owner and Mode
sudo chown -R pi:www-data /var/
sudo chmod -R 777 /var/
sudo chown pi:pi /var/
sudo chmod -R ugo+rw /var/ 


Step 6: Edit Sudoers
sudo nano /etc/sudoers
then add...
www-data ALL=(ALL) NOPASSWD: ALL

