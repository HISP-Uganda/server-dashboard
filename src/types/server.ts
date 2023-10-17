export interface Server {
    id: string;
    name: string;
    ip?: string;
    port?: number;
    password?: string;
    username?: string;
//     {
//       "os": {
//           "NAME": "Ubuntu",
//           "VERSION": "18.04.6 LTS (Bionic Beaver)",
//           "ID": "ubuntu",
//           "ID_LIKE": "debian",
//           "PRETTY_NAME": "Ubuntu 18.04.6 LTS",
//           "VERSION_ID": "18.04",
//           "HOME_URL": "https://www.ubuntu.com/",
//           "SUPPORT_URL": "https://help.ubuntu.com/",
//           "BUG_REPORT_URL": "https://bugs.launchpad.net/ubuntu/",
//           "PRIVACY_POLICY_URL": "https://www.ubuntu.com/legal/terms-and-policies/privacy-policy",
//           "VERSION_CODENAME": "bionic",
//           "UBUNTU_CODENAME": "bionic"
//       },
//       "memory": {
//           "total": "58G",
//           "used": "22G",
//           "free": "35G",
//           "shared": "168M",
//           "cache": "1.3G",
//           "available": "35G",
//           "swapTotal": "0B",
//           "swapUsed": "0B",
//           "swapFree": "0B"
//       },
//       "disk": {
//           "total": "30G",
//           "used": "0",
//           "free": "30G",
//           "percent": "0%"
//       },
//       "containers": [...]
//   }
    info?: { 
      os: any, 
      containers: Container[], 
      uptime: string, 
      memory:  any,
      disk: any
   }
 }

 interface Container {
    name: string,
    state: string
 }
 export interface ServerForm extends Omit<Server, 'id'> {
    // Additional properties specific to the form
}
