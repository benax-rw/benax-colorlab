<b>Benax ColorLab Project</b>

<b>Step 1: Look for updates and then install them</b><br>
sudo apt update && sudo apt upgrade -y<br>

<b>Step 2: Install Apache2 and PHP7</b><br>
sudo apt-get install -y apache2 php7.0 libapache2-mod-php7.0<br>
sudo chmod -R 777 /var/www/<br>
cd /var/www/html/<br>

<b>Step 3: Clone benax-colorlab from remote Github</b><br>
unzip benax-colorlab.zip <br>
rm benax-colorlab.zip <br>
mv index.html index.html.old<br>

<b>Step 4: Install NeoPixel</b><br>
cd server/
git clone https://github.com/jgarff/rpi_ws281x.git && cd rpi_ws281x && sudo apt-get install scons && sudo apt-get install build-essential python-dev git scons swig -y && scons && cd python && sudo python setup.py install && reboot<br>

<b>Step 5: Change Owner and Mode</b><br>
sudo chown -R pi:www-data /var/<br>
sudo chmod -R 777 /var/<br>
sudo chown pi:pi /var/<br>
sudo chmod -R ugo+rw /var/ <br>

<b>Step 6: Edit Sudoers</b><br>
sudo nano /etc/sudoers<br>
then add...<br>
www-data ALL=(ALL) NOPASSWD: ALL<br>

