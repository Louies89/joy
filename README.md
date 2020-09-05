### Setup react project with Next

Create & setup a project by running the following commands:

```sh
mkdir joy
cd joy
npm init -y
npm install --save react react-dom
npm install --save next
```
In `Next.js`, a **page** is a React Component exported from a `.js`, `.jsx`, `.ts`, or `.tsx` file in the pages directory. Each page is associated with a route based on its file name.

Pages can also be added under [`src/pages`](https://nextjs.org/docs/advanced-features/src-directory) as an alternative to the root `pages` directory. lets create `pages` directory inside `src` directory.

```sh
mkdir src/pages
```

The `src` directory is very common in many apps and `Next.js` supports it by default.

**Example**: If you create `src/pages/about.js` that exports a React component like below, it will be accessible at /about


Then open the "package.json" file in the "joy" directory and replace scripts with the following:

```sh
"scripts": {
  "dev": "next",
  "build": "next build",
  "start": "next start"
}
```

Now everything is ready. Run the following command to start the dev server:

```
npm run dev
```

Then open `http://localhost:3000` from your favourite browser.

Output you see on the screen is :

```json
404 - This page could not be found
```

As there is no pages to load, the 404 error is shown in the browser. 

So lets create a `src/pages/index.js` page with following content to be served by NextJs.

```javascript
export default function Index() {
  return (
    <div>
      <p>Hello JOY</p>
    </div>
  );
}
```
By checking the we can see **Hello JOY**.

Now the application is a CSR([Client Side Rendering](https://blog.logrocket.com/next-js-vs-create-react-app/)) application.

### Set up Express server to make the app SSR(Server Side Rendering) application

First, add Express into your app:

```sh
npm install --save express
```

Then create a file called `server/index.js` in your app and add following content:

```sh
const express = require('express')
const next = require('next')
    
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
    
app.prepare().then(() => {
  const server = express()
    
  server.get('*', (req, res) => {
    return handle(req, res)
  })
    
  server.listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})
```

Now update the `npm dev` [script](https://nextjs.org/docs/advanced-features/custom-server) in `package.json` as below:

```sh
"scripts": {
  "dev": "node server/index.js",
  "build": "next build",
  "start": "NODE_ENV=production node server/index.js"
}
```


### Disabling file-system routing ([Referance](https://nextjs.org/docs/advanced-features/custom-server#disabling-file-system-routing))

By default, `Next` will serve each file in the `pages` folder under a pathname matching the filename. As this project uses a custom server, this behavior may result in the same content being served from multiple paths, which can present problems with SEO and UX.

To disable this behavior and prevent routing based on files in `pages`, open `next.config.js` and disable the `useFileSystemPublicRoutes` config:

```json
module.exports = {
  useFileSystemPublicRoutes: false,
}
```

Note that `useFileSystemPublicRoutes` disables filename routes from SSR; client-side routing may still access those paths. When using this option, you should guard against navigation to routes you do not want programmatically.

You may also wish to configure the client-side Router to disallow client-side redirects to filename routes; for that refer to [`Router.beforePopState`](https://nextjs.org/docs/api-reference/next/router#routerbeforepopstate).

By doing so, if we will go to `http://localhost:3000`, then the output you see on the screen is : 

```json
404 - This page could not be found
``` 

So to make it workable the below changes has to be made :

```diff
const express = require('express')
const next = require('next')
    
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
    
app.prepare().then(() => {
  const server = express()
    
  server.get('*', (req, res) => {
+   app.render(req, res, "/");
-   return handle(req, res)
  })
    
  server.listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})
```

### Configuring the Build ID ([Referance](https://nextjs.org/docs/basic-features/static-file-serving))

`Next.js` uses a constant id generated at build time to identify which version of your application is being served. This can cause problems in multi-server or multiple containers (like docker container) deployments when `next build` is ran on every server. In order to keep a constant build id between builds you can provide your own build id. Open next.config.js and add the generateBuildId function:

```diff
module.exports = {
  useFileSystemPublicRoutes: false,
+  generateBuildId: async () => {
+    // You can, for example, get the latest git commit hash here
+    return 'my-build-id'
+  },
}
```


### Static Resource File Serving ([Referance](https://nextjs.org/docs/basic-features/static-file-serving))

Next.js can serve static files, like images, under a folder called public in the root directory. Files inside public can then be referenced by your code starting from the base URL (/).

So lets create a `public` directory in the root directory:

```sh
mkdir public
```

For example, if you add an image to public/my-image.png, the following code will access the image:

```javascript
function MyImage() {
  return <img src="/my-image.png" alt="my image" />
}

export default MyImage
```

**Note**: 
 - Don't name the public directory anything else. The name cannot be changed and is the only directory used to serve static assets.
 - This folder is also useful for robots.txt, Google Site Verification, and any other static files (including .html)!

But generally the images formm public folder does not get loaded. So to make them workable we have to use `next-images` npm library.

```sh
npm install --save next-images
```

Then in `next.config.js` file we shall make the changes as below:

```diff
+ const withImages = require('next-images')
module.exports = withImages({
  useFileSystemPublicRoutes: false,
  generateBuildId: async () => {
    // You can, for example, get the latest git commit hash here
    return 'my-build-id'
  },
})
```

### Setting Up Test ([Referance](https://medium.com/codeclan/testing-react-with-jest-and-enzyme-20505fec4675))
**Jest**

Jest is a JavaScript unit testing framework, used by Facebook to test services and React applications. Jest acts as a **test runner**, **assertion library**, and **mocking library**. Jest also provides **Snapshot testing**, the ability to create a rendered 'snapshot' of a component and compare it to a previously saved `snapshot`. The test will fail if the two do not match. Snapshots will be saved for you beside the test file that created them in an auto-generate `__snapshots__` folder.

**Enzyme**

Enzyme is a JavaScript Testing utility for React that makes it easier to assert, manipulate, and traverse your React Components' output. Enzyme, created by Airbnb, adds some great additional utility methods for **rendering a component** (or multiple components), **finding elements**, and **interacting with elements**.

**Jest and Enzyme**

- Both Jest and Enzyme are specifically designed to test React applications, Jest can be used with any other Javascript app but Enzyme only works with React.
- Jest can be used without Enzyme to render components and test with snapshots, Enzyme simply adds additional functionality.
- Enzyme can be used without Jest, however Enzyme must be paired with another test runner if Jest is not used.

As described, we will use:
- Jest as the test runner, assertion library, and mocking library
- Enzyme to provide additional testing utilities to interact with elements

**Installing and configuring**

Install Jest

```sh
npm install --save-dev jest
```
Next.js includes the [`next/babel`](https://nextjs.org/docs/advanced-features/customizing-babel-config) preset to our app, it includes everything needed to compile React applications and server-side code. But in order to extend ES5 & ES6 functionalities like use of `import` statement for testing, we can simply define a `.babelrc` file at the root of our app with below config options:

```js
//.babelrc
{
  "presets": ["next/babel"],
  "plugins": []
}
```

To create the test scenarios, we will create a `__tests__` folder root of our app. All the test scenarios shall have the file extension `*.test.js`, example : `about.test.js` to test `about.js` page functionalities.

Install Enzyme
```sh
# 'enzyme-adapter-react-16' is the binding between Enzime and React 16.x
npm i --save-dev enzyme enzyme-adapter-react-16
```

As we are using enzime with jest, we have to create enzime adaptors for jest. To do that we have to create 2 extra files jest.config.js and jest.setup.js at the root of the project. 

```js
//jest.config.js

module.exports = {
  setupFiles: ['<rootDir>/jest.setup.js'],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/']
}
```

```js
//jest.setup.js

import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })
```

Let's write a simple test case in `__tests__/index.test.js`

```js
import React from "react";
import Index from "../src/pages/index.js";
import { shallow } from "enzyme";

describe("Hello JOY", () => {
    it('App shows "Hello JOY"', () => {
      const app = shallow(<Index />);
      expect(app.find("p").text()).toEqual("Hello JOY");
    });
});
```

### Adding react-bootstrap ([Referance](https://react-bootstrap.github.io/getting-started/introduction/))
Add react-bootstrap to the project:

```sh
npm install react-bootstrap
```

React-Bootstrap doesn't depend on a precise version of Bootstrap, it doesn't ship with any included CSS. However, some stylesheet is required to use these components.  The simplest way is to include the latest styles from the CDN.

One advantage of using the Bootstrap CDN is many users already have downloaded Bootstrap from MaxCDN when visiting another site. As a result, it will be loaded from cache when they visit your site, which leads to faster loading time. Also, most CDN's will make sure that once a user requests a file from it, it will be served from the server closest to them, which also leads to faster loading time. So below link can be used to include the [latest styles from the CDN](https://react-bootstrap.github.io/getting-started/introduction/#css) in the <Head/> section.

```js
import Head from 'next/head'

export default function Index() {
    return (
        <div>
            <Head>
                <title>Home</title>
                <link rel="stylesheet" crossorigin="anonymous"
                href="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
                integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" />

                <link rel="stylesheet"  //Add font-awesome
                href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.1/css/font-awesome.min.css"/>  
            </Head>
            <Header/>
            <p>Hello Next.js</p>
        </div>
    );
}
```


-------------------------------------------
##### Steps for Babel & Webpack can be icgnored as NextJs itself takes cares of these internally
7. Using Webpack and Babel as dev dependencies

- Webpack and Babel are dev dependencies, i.e. we dont need them in production mode.
- Babal  is responsible for converting the ES5 and ES6 code to browser understandable code, basically backward compatibility. 
-  The Babal packages that we are gonna use are:
    - **babel-core**: Well as the name suggests the main engine of babel plugin for its dependents to work.
    - **babel-preset-env**: This is the ES5, ES6 supporting part
    - **babel-preset-react**: Babel can be used in any framework that needs latest JS syntax support, in our case its "React", hence this preset.
    - **babel-loader**: Consider this as a bridge of communication between Webpack and Babel
-  At its core, webpack is a static module bundler for modern JavaScript applications. When webpack processes your application, it internally builds a dependency graph which maps every module your project needs and generates one or more bundles.
    - **webpack**: The main webpack plugin as an engine for its dependents.
    - **webpack-cli**: To access some webpack commands through CLI like starting dev server, creating production build, etc.
    - **webpack-dev-server**: A minimal server for client-side development purpose only.
    - **html-webpack-plugin**: Will help in creating HTML templates for our application.

8. Install Babel
```
npm i -D babel-core babel-loader babel-preset-env babel-preset-react
```
9. Install webpack
```
npm i -D webpack webpack-cli webpack-dev-server html-webpack-plugin
```

Our next step is to create the configuration files which will act as a leash on Webpack and Babel, providing them with the necessary information within which they should operate.

10. Configuring Babel:

create a file .babelrc in "joynode" directory. If directy creating a file starting with "." is not allowed then create using command prompt.

In .babelrc file add below line
```
{"presets":["env", "react"]}
```
This is the configuration file babel looks up for.

11. Configuring Webpack

Create a file webpack.config.js , note the name of the file should be same, the content will be the following:
```
const path = require('path');
const HWP = require('html-webpack-plugin');
module.exports = {
   entry: path.join(__dirname, '/src/index.js'),
   output: {
       filename: 'build.js',
       path: path.join(__dirname, '/dist')
    },
   module:{
       rules:[{
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
       }]
   },
   plugins:[
       new HWP(
          {template: path.join(__dirname,'/src/index.html')}
       )
   ]
}
```

12. NextJs with expressjs
https://blog.logrocket.com/how-to-build-a-server-rendered-react-app-with-next-express-d5a389e7ab2f/
https://github.com/zeit/next.js/tree/canary/examples/custom-server-express
https://github.com/mluberry/nextjs-express




## Referances:
https://serverless-stack.com/#table-of-contents 
https://jasonwatmore.com/post/2017/09/16/react-redux-user-registration-and-login-tutorial-example
https://auth0.com/blog/next-js-authentication-tutorial/

https://dev.to/jolvera/user-authentication-with-nextjs-4023
https://levelup.gitconnected.com/secure-nextjs-app-users-with-auth0-and-typescript-3b0a6ac3a163 

A curated list of awesome resources : books, videos, articles about using Next.js (A minimalistic framework for universal server-rendered React applications
https://github.com/unicodeveloper/awesome-nextjs

A comprehensive Nextjs project template
https://github.com/stanleyfok/nextjs-template

NextJs Page Rendering:
https://nextjs.org/docs/basic-features/pages

E-Commerce App : https://www.youtube.com/watch?v=wPQ1-33teR4&t=5449s
Redux: https://www.youtube.com/watch?v=CVpUuw9XSjY&t=1918s

nodejs setting up environ variable : Node.js Everywhere with Environment Variables!
dotenv with nodemon:https://medium.com/@pdx.lucasm/dotenv-nodemon-a380629e8bff
Using dotenv : Using dotenv with Jest
Test a Node RESTful API with Mocha and Chai : https://scotch.io/tutorials/test-a-node-restful-api-with-mocha-and-chai
understanding jest mock & spyon : https://medium.com/@rickhanlonii/understanding-jest-mocks-f0046c68e53c
