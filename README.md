# conradmargoles

A website for a client built with [Next.js](https://nextjs.org/).

![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)
![Cloudflare](https://img.shields.io/badge/Cloudflare-F38020?style=for-the-badge&logo=Cloudflare&logoColor=white)

## Installation

### Windows

Install Node, npm and [nvm-windows](https://github.com/coreybutler/nvm-windows) with:

```pwsh
winget install nvm-windows
nvm install lts
nvm use lts
npm install -g npm
```

### MacOS/Linux

Install Node, npm and [nvm](https://github.com/nvm-sh/nvm) with:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/$(curl -s https://api.github.com/repos/nvm-sh/nvm/releases/latest | grep tag_name | cut -d\" -f4)/install.sh | bash
nvm use
npm install -g npm
```

## Development

Run the development server with:

```bash
npm run dev
```
