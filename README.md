# CryptoViz

CryptoViz is a hobby project intended to demonstrate the viability of an interactive visualization tool for encryption algorythms. It is not intended to be a tool for ensuring cryptographic viability, instead it is an educational tool. The main thrust of the project is to provide a more intuitive way to demonstrating the implementation of encryption algorithms. In general, given the input needed to perform a run a specific encryption (or decryption) algorithm this tool will visualize what is happening and provide explanations for what is happening at each logical step in the process.

*Supported algorithms*
- Ceasar Cipher
- Vigenere Cipher

## Installation and whatnot

Clone the project to your local machine and run `npm run install` to install the dependencies for the project.

`npm run start` will start the webpack dev server and make the application available at `http://localhost:8080/`.

`npm run build` will bundle the project so it can be published on a dedicated web server. However this was never tested, so your mileage may vary with this one.

# Future plans

I would have liked to implement more ciphers, and more complex ones as well. However, doing so would require a lot of time investment as each cipher needs to be reimplemented from scract. This is due to the visualizer needing access to all the temporary data that is using during the encryption/decryption process. As such I cannot leverage existing libraries as they hide that information. Additionally, I feel I have proven the viability of such a tool with the two ciphers currently implemented. Additional ones will be added only if time and motivation permits.