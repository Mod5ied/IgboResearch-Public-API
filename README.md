# IgboResearch-Public-API

A free and open-source version of the IgboResearch project.
An Igbo language dictionary and word-translation software project.

* Revolutionalizes Igbo language translation and understanding.
* Delivers accurate and well-researched results for queries.
* Makes research with Igbo language enjoyable and intutive.
* Link to project home page

## Table of Contents

1. [About the Project](#about-the-project)
1. [Project Status](#project-status)
1. [Getting Started](#getting-started)
    1. [Dependencies](#dependencies)
    1. [Building](#building)
    2. [Running Tests](#running-tests)
        1. [Other Tests](#other-tests)
    1. [Installation](#installation)
    1. [Usage](#usage)
1. [Release Process](#release-process)
    1. [Versioning](#versioning)
    1. [Payload](#payload)
1. [How to Get Help](#how-to-get-help)
1. [Contributing](#contributing)
1. [Further Reading](#further-reading)
1. [License](#license)
1. [Authors](#authors)
1. [Acknowledgments](#acknowledgements)

## About the Project

* Personalized search results
* Dictionary tab for deeper research and queries.
* No generic translations and dictionary results.
* Suggestive prompts for possible search query.
* Interative translation quiz feature for young users and school students.
* Intractive dictionary quiz feature.
* This project aims to provide what traditional solutions like Google translate fail to give.
* Links to the project site

```
Fetch words from the search database cluster:

const getWords = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(`${endPoints.url1}allWords`);
        const results = await res.data;
        resolve(results);
        if (!results.state) {
          throw new Error(results.state);
        }
      } catch (err) {
        reject(err.response.data);
      }
    });
  };

Make a batch-upload from your favorite in-browser database e.g(indexedDB, localStorage) to search
to search or dictionary database cluster.
  
  const batchUpload = async (data = [], constant = "") => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(`${endPoints.url2}${constant}`, data);
        const results = await res.data;
        resolve(results);
      } catch (err) {
        reject(err.response.data);
      }
    });
  };
```

**[Back to top](#table-of-contents)**

## Project Status

Currently compiles on your host machine, APIs are set and currently in use, offline storage feature partially implemented, etc.

**[Back to top](#table-of-contents)**

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Dependencies

DEVELOPMENT dependencies:
* Node.js (v.14 and above).
* Express.js. (v.4 and above)
* Mongoose (Make sure to have mongodb installed locally, if you wish to run on your local machine).
* Helmet (Prevents cross-origin attacks and cors exceptions).
* Pino, Pino-pretty (Pino is used for logging).
* Dotenv (Handles the environment variables for the software)
* BCrypt.

TEST dependencies:
* mocha (test library)
* chai (assertion library)
* mockgoose (though I would recommend mongodb-memory-server)
* supertest.

### Installation (Core dependencies)
```
YARN:
    yarn add node@latest express@latest mongoose helmet pino pino-pretty dotenv bycrypt
    
NPM: 
    npm install node@latest express@latest mongoose helmet pino pino-pretty dotenv bycrypt
```

### Installation (Dev and Test dependencies)
```
YARN:
    yarn add -D mocha chai mockgoose supertest
    
NPM: 
    npm install -D mocha chai mockgoose supertest
```

### Getting the Source

This project is [hosted on GitHub](https://github.com/Mod5ied/IgboResearch-Public-API). You can clone this project directly using this command:

```
git clone git@github.com:Mod5ied/IgboResearch-Public-API.git
```
### Running the cloned project

Simply run the command below to install all dependencies:

```
    npm install
    
    yarn
```

### Running Tests

Executes the test scripts.

```
    npm run test
    
    yarn run test
```

### Usage

Spin up the dev server and run the project using the command:

```
    npm run start
    
    yarn run start
```

**[Back to top](#table-of-contents)**

## How to Get Help

Provide any instructions or contact information for users who need to get further help with your project.

## Contributing

Provide details about how people can contribute to your project. If you have a contributing guide, mention it here. e.g.:

We encourage public contributions! Please review [CONTRIBUTING.md](docs/CONTRIBUTING.md) for details on our code of conduct and development process.

**[Back to top](#table-of-contents)**

**[Back to top](#table-of-contents)**

## License

Copyright (c) 2021 Ogwuru Patrick.

This project is licensed under the MIT License - see [LICENSE.md](LICENSE.md) file for details.

**[Back to top](#table-of-contents)**

## Authors

* **[Ogwuru Patrick](https://github.com/mod5ied)** - *Initial work* - [IgboResearch API](https://github.com/Mod5ied/IgboResearch-Public-API)

**[Back to top](#table-of-contents)**

## Acknowledgments
https://github.com/Mod5ied

**[Back to top](#table-of-contents)**
