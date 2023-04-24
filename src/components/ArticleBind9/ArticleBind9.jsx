import React from 'react';
import { Helmet } from 'react-helmet';
import BindPic from './img/bindconf1.png';

class ArticleBind9 extends React.Component{
    render() {
        return (
            <div className='mr-8'>
                <div className='flex flex-col bg-neutral-100 p-4 ml-3 mr-1 mt-10 md:p-11 md:pl-20 md:mt-11 md:ml-28 md:mr-10 md:pr-20 rounded-md drop-shadow-lg w-full md:w-auto'>
                    <Helmet>
                        <title>Setup Bind9 on Ubuntu 22.04</title>
                    </Helmet>
                    <div>
                        <h1 className='font-bold text-3xl text-cyan-600'>How to Setup Bind (DNS Server) on Ubuntu 22.04</h1>
                    </div>
                    <div className='pt-7 text-base px-2'>
                        <p className='whitespace-pre-wrap' dangerouslySetInnerHTML={{ __html: this.props.generatedAnswer }}></p>
                        <p><br/><br/>DNS or Domain Name System, as we know is an internet service that is used to translate the user friendly domain into computer friendly IP addresses. Not only can we translate domain names to IP addresses, we can also perform reverse translation i.e. from IP addresses to domain name translations. In this post, we are going to learn to setup a private DNS server by implementing BIND 9 on Ubuntu 22.04.</p>
                        <div>
                            <h3 className='font-semibold text-xl pt-7'>Prerequisites:</h3>
                            <ul className='list-disc list-inside pl-4'>
                                <li>Minimal Instelled Ubuntu 22.04</li>
                                <li>Sudo User with admin privileges</li>
                                <li>Internet connectivity</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className='font-semibold text-xl pt-7'>Lab setup:</h3>
                            <ul className='list-disc list-inside pl-4'>
                                <li>Bind Server IP (Ubuntu 22.04)  = 192.168.0.40</li>
                                <li>Domain Name = linuxtechi.local</li>
                                <li>Private Network = 192.168.0.0/24</li>
                            </ul>
                        </div>
                        <div className=''>
                            <h2 className='font-medium text-2xl pt-8 text-cyan-500 pb-2'>Step 1) Install Bind9 Package</h2>
                            <p>We need to install 'bind9 bind9utils bind9-doc dnsutils' to install BIND9 & realted tools. Open your terminal & execute the following apt command:</p>
                            <div className="bg-gray-800 rounded-lg p-4 mt-4 text-xs">
                                <code className="text-cyan-300">$ sudo apt update</code>
                                <code className="text-cyan-300">$ sudo apt install -y bind9 bind9utils bind9-doc dnsutils</code>
                            </div>
                        </div>
                        <div className=''>
                            <h2 className='font-medium text-2xl pt-8 text-cyan-500 pb-2'>Step 2) Configure Bind9 (DNS Server)</h2>
                            <p> Once all the packages have been installed, we will move into the configuration part. All configuration files for BIND are located in folder 
                                ‘/etc/bind’. <br/><br/>One of the important configuration file for bind is “/etc/bind/named.conf.options“, 
                                from this file we can set the followings parameters:
                            </p>
                            <ul className='list-disc list-inside pl-4 md:pl-10 pt-4 pb-2'>
                                <li>Allow Query to your dns from your private network (As the name suggests only the systems from your private network can query dns sever for name to ip translation and vice-versa)</li>
                                <li>Allow recursive query</li>
                                <li>Specify the DNS port (53)</li>
                                <li>Forwarders (DNS query will be forwarded to the forwarders when your local DNS server is unable to resolve query)</li>
                            </ul>
                            <p> As per my private network settings, I have specified the following parameters: </p>
                            <div className="bg-gray-800 rounded-lg p-4 mt-4 text-xs">
                                <code className="text-cyan-300">$ sudo vi /etc/bind/named.conf.options<br/><br/></code>
                                <code className="text-cyan-300">acl internal-network &#123;<br/></code>
                                <code className="text-cyan-300">192.168.0.0/24;<br/></code>
                                <code className="text-cyan-300">&#125;;<br/><br/></code>
                                <code className="text-cyan-300">options &#123;<br/></code>
                                <code className="text-cyan-300 ml-16">directory "/var/cache/bind";<br/></code>
                                <code className="text-cyan-300 ml-16">allow-query &#123; localhost; internal-network; &#125;;<br/></code>
                                <code className="text-cyan-300 ml-16">allow-transfer &#123; localhost; &#125;;<br/></code>
                                <code className="text-cyan-300 ml-16">forwarers &#123; 8.8.8.8; &#125;;<br/></code>
                                <code className="text-cyan-300 ml-16">recursion yes;<br/></code>
                                <code className="text-cyan-300 ml-16">dnssec-validation auto;<br/></code>
                                <code className="text-cyan-300 ml-16">listen-on-v2 &#123; any; &#125;;<br/></code>
                                <code className="text-cyan-300">&#125;;<br/></code>
                            </div>
                            <div className='pt-6 md:pr-40 pb-4 shrink-0'><img src={BindPic} alt='Bind conf' className=''></img></div>
                            <p>Next Important Configuration file is “/etc/bind/named.conf.local“, in this file we will define the zone files for our domain, edit the file add the following entries:</p>
                            <div className="bg-gray-800 rounded-lg p-4 mt-4 mb-4 text-xs">
                                <code className="text-cyan-300">$ cd /etc/bind<br/></code>
                                <code className="text-cyan-300">$ sudo vi named.conf.local<br/></code>
                                <code className="text-cyan-300">zone "linuxtechi.local" IN &#123;<br/></code>
                                <code className="text-cyan-300 ml-16">type master;<br/></code>
                                <code className="text-cyan-300 ml-16">file "/etc/bind/forward.linuxtechi.local";<br/></code>
                                <code className="text-cyan-300 ml-16">allow-update &#123; none; &#125;;<br/></code>
                                <code className="text-cyan-300">&#125;;<br/></code>
                                <code className="text-cyan-300">zone "0.168.192.in-addr.arpa" IN &#123;<br/></code>
                                <code className="text-cyan-300 ml-16">type master;<br/></code>
                                <code className="text-cyan-300 ml-16">file "/etc/bind/reverse.linuxtechi.local";<br/></code>
                                <code className="text-cyan-300 ml-16">allow-update &#123; none; &#125;;<br/></code>
                                <code className="text-cyan-300">&#125;;<br/></code>
                            </div>
                            <p>
                                Save the file & exit. Here we have mentioned locations for our forward lookup zone file & reverse lookup zone files. Next we will create the mentioned forward & reverse zone files.
                                <br/><br/>Firstly create the forward lookup zone file, Sample zone files (db.local) are already there in ‘/etc/bind’ folder, we can use and copy sample zone file,
                            </p>
                            <div className="bg-gray-800 rounded-lg p-4 mt-4 mb-4 text-xs">
                                <code className="text-cyan-300">$ cd /etc/bind<br/></code>
                                <code className="text-cyan-300">$ sudo cp db.local forward.linuxtechi.local<br/></code>
                                <code className="text-cyan-300">$ sudo vi forward.linuxtechi.local<br/></code>
                                <code className="text-cyan-300">$TTL 604800<br/></code>
                                <code className="text-cyan-300">@ IN SOA primary.linuxtechi.local. root.primary.linuxtechi.local. (<br/></code>
                                <code className="text-cyan-300 ml-16">2022072651 ; Serial<br/></code>
                                <code className="text-cyan-300 ml-16">3600 ; Refresh<br/></code>
                                <code className="text-cyan-300 ml-16">1800 ; Retry<br/></code>
                                <code className="text-cyan-300 ml-16">604800 ; Expire<br/></code>
                                <code className="text-cyan-300 ml-16">604600 ) ; Negative Cache TTL<br/></code>
                                <code className="text-cyan-300">;Name Server Information<br/></code>
                                <code className="text-cyan-300">@ IN NS primary.linuxtechi.local.<br/><br/></code>
                                <code className="text-cyan-300">;IP address of Your Domain Name Server(DNS)<br/></code>
                                <code className="text-cyan-300">primary IN A 192.168.0.40<br/><br/></code>
                                <code className="text-cyan-300">;Mail Server MX (Mail exchanger) Record<br/></code>
                                <code className="text-cyan-300">linuxtechi.local. IN MX 10 mail.linuxtechi.local.<br/><br/></code>
                                <code className="text-cyan-300">;A Record for Host names<br/></code>
                                <code className="text-cyan-300">www IN A 192.168.0.50<br/></code>
                                <code className="text-cyan-300">mail IN A 192.168.0.60<br/><br/></code>
                                <code className="text-cyan-300">;CNAME Record<br/></code>
                                <code className="text-cyan-300">ftp IN CNAME www.linuxtechi.local.<br/></code>
                            </div>
                            <p>
                                Here, we have added information regarding our DNS server & have also added A records for couple of servers, also added record for a mail server & CNAME record for ftp server. Make sure you edit this file to suit your network.<br/><br/>
                                Next we will create a reverse lookup zone file at the same location,sample reverse lookup zone file is present at ‘/etc/bind‘ folder.
                            </p>
                            <div className="bg-gray-800 rounded-lg p-4 mt-4 mb-4 text-xs">
                                <code className="text-cyan-300">$ sudo cp db.127 reverse.linuxtechi.local<br/></code>
                                <code className="text-cyan-300">$ sudo vi /etc/bind/reverse.linuxtechi.local<br/></code>
                                <code className="text-cyan-300">$TTL 86400<br/></code>
                                <code className="text-cyan-300">@ IN SOA linuxtechi.local. root.linuxtechi.local. (<br/></code>
                                <code className="text-cyan-300 ml-16">2022072651 ; Serial<br/></code>
                                <code className="text-cyan-300 ml-16">3600 ; Refresh<br/></code>
                                <code className="text-cyan-300 ml-16">1800 ; Retry<br/></code>
                                <code className="text-cyan-300 ml-16">604800 ; Expire<br/></code>
                                <code className="text-cyan-300 ml-16">86400 ; Minimum TTL<br/></code>
                                <code className="text-cyan-300">;Name Server Information<br/></code>
                                <code className="text-cyan-300">@ IN NS primary.linuxtechi.local.<br/><br/></code>
                                <code className="text-cyan-300">;IP address of Your Domain Name Server(DNS)<br/></code>
                                <code className="text-cyan-300">primary IN A 192.168.0.40<br/><br/></code>
                                <code className="text-cyan-300">;Reverse Lookup for Your DNS Server<br/></code>
                                <code className="text-cyan-300">40 IN PTR primary.linuxtechi.local.<br/><br/></code>
                                <code className="text-cyan-300">;PTR Record IP address to HostName<br/></code>
                                <code className="text-cyan-300">50 IN PTR www.linuxtechi.local.<br/></code>
                                <code className="text-cyan-300">mail IN A 192.168.0.60<br/><br/></code>
                                <code className="text-cyan-300">60 IN PTR mail.linuxtechi.local.<br/></code>
                            </div>
                            <p>Save file & exit. <br/><br/>Update the following parameter in ‘/etc/default/named ‘ file, so that dns service starts listening on IPv4</p>
                            <div className="bg-gray-800 rounded-lg p-4 mt-4 mb-4 text-xs">
                                <code className="text-cyan-300">OPTIONS="-u bind -4"</code>
                            </div>
                            <p>Now all we have to do is to start and enable the BIND service to implement the changes made,</p>
                            <div className="bg-gray-800 rounded-lg p-4 mt-4 mb-4 text-xs">
                                <code className="text-cyan-300">$ sudo systemctl start named<br/></code>
                                <code className="text-cyan-300">$ sudo systemctl enable named</code>
                            </div>
                            <p>View the bind service status, run</p>
                            <div className="bg-gray-800 rounded-lg p-4 mt-4 mb-4 text-xs">
                                <code className="text-cyan-300">$ sudo systemctl status named</code>
                            </div>
                            <p>Note : In case OS firewall is running on your bind server then execute the below command to allow 53 port</p>
                            <div className="bg-gray-800 rounded-lg p-4 mt-4 mb-4 text-xs">
                                <code className="text-cyan-300">$ sudo ufw allow 53</code>
                            </div>
                        </div>
                        <div>
                            <h2 className='font-medium text-2xl pt-8 text-cyan-500 pb-2'>Step 3) Validating Syntax of bind configuration and Zone files</h2>
                            <p>If you want to cross verify the syntax of your bind 9 configuration file (named.conf.local). Use the command “named-checkconf“, example is shown below:</p>
                            <div className="bg-gray-800 rounded-lg p-4 mt-4 mb-4 text-xs">
                                <code className="text-cyan-300">$ sudo named-checkconf /etc/bind/named.conf.local</code>
                            </div>
                            <p>
                                If there is no syntax error in your bind configuration file, then it should return to shell without showing any errors.<br/><br/>
                                To cross verify the syntax your forward and reverse lookup zone files , use the command “named-checkzone”, example is shown below:
                            </p>
                            <div className="bg-gray-800 rounded-lg p-4 mt-4 mb-4 text-xs">
                                <code className="text-cyan-300">$ sudo named-checkzone linuxtechi.local /etc/bind/forward.linuxtechi.local<br/></code>
                                <code className="text-cyan-300">$ sudo named-checkzone linuxtechi.local /etc/bind/reverse.linuxtechi.local</code>
                            </div>
                            <p>
                                Now that our server is working fine, we can add other servers like mail server, ftp server or web servers to DNS server configuration files by creating the appropriate records as per requirement. Also we have only setup a local DNS server in this tutorial, if you need to setup a public DNS than you will require a Public IP address for the same.<br/><br/>
                                With this we end our post on how to install & configure DNS server on Ubuntu 22.04 using BIND 9. Please do send your valuable feedback/queries to us, we will be happy to address them all.
                            </p>
                        </div>
                        
                    </div>
                </div>
            </div>
        );
    }
}

export default ArticleBind9;