const mode: any = {
  PRODUCTION: 'https://1roos.com',
  DEVELOPMENT: 'http://192.168.0.224:4000',
  LOCAL: "http://localhost:4000"
}

const appMode: any = process.env.NEXT_PUBLIC_APP_MODE?.trim()

const sdkLinkObject: any = {
  PRODUCTION: 'https://web.1roos.com/',
  DEVELOPMENT: 'http://192.168.0.224:3001/',
  LOCAL: 'http://localhost:3001/',
}

const UrlHelper = {
  serverUrl: mode[appMode],
  API_PATH: '/api/v1/',
  menuLink: 'https://web.1roos.com/?restaurant_id={id}',
  sdkLink: sdkLinkObject[appMode],
  get imgPath() {
    return `${this.serverUrl}${this.API_PATH}`;
  },
};


export default UrlHelper
