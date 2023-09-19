# nostrbook

Nostrbook is a throwback to 2008-2009 era Facebook, powered by the Nostr protocol. It simplifies friend connections with "pending" and "accepted" lists. If you're both on each other's "pending" lists, you become friends. This system allows features like mutual friends, wall access, and posting on walls. Nostalgia is a hell of a drug.
Nostrbook: Bringing Social Media Back to Its Roots

Really, my goal with Nostrbook is to recapture the essence of social media from a simpler time. I want to rekindle the joy of adding your actual friends and family to stay connected in a more personal, genuine way, stepping away from the impersonal nature of modern social media to enjoy a more authentic online experience without instrusive ads and algorithms!

## Prerequisites

##### git

If you don't already have `git` for windows you can download it [here](https://github.com/git-for-windows/git/releases/download/v2.42.0.windows.2/Git-2.42.0.2-64-bit.exe)

- make sure to add `git` to PATH during install

##### NodeJS

You will also need NodeJS installed and have `npm` in your PATH to run the development server. The installer should add it to your PATH but if you are having issues, check this.

You can install NodeJS for Windows (x64) 18.17.1 LTS [here](https://nodejs.org/dist/v18.17.1/node-v18.17.1-x64.msi)

Run `npm -v` to check the version and confirm it is working properly

##### This App is styled with TailwindCSS

- [Here](https://v2.tailwindcss.com/docs/utility-first) is a comparison of Tailwind to Traditional CSS
- [Here](https://tailwindcss.com/docs/border-style) are the Tailwind Docs

## Developing

Clone this repository with `git clone git.happytavern.co/oceanslim/nostr-app.git`

install dependencies with `npm install`

Then, start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
