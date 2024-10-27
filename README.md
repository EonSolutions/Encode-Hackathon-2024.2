# Welcome to **Sepia!**
**Sepia** is a secure framework designed to handle user data encryption, and processing using Fully Homomorphic Encryption (FHE) integrated with the Flare Network's Data Connector for validation.

## Key Features:
- Agent Validation using the FDC
- Fully Homomorphic Encryption of data during processing
- Support for AI Processing
### How does Sepia Work? *Unfinished*
Sepia works by encrypting input data by users and storing it on an external repository. It then sends a request to the Flare Data Connector with a hash to this data. <br><br>
By extending Flare's attestation type to suit Sepia's needs, we can **verify data integrity** across multiple sources before processing, supporting privacy-preserving, multi-chain interoperability.<br><br>
Hosted 'agents' accept encrypted inputs sent by the FDC and processes them, utilising **Full Homomorphic Encryption** to process user data without decrypting it.<br><br>
Data is passed back to the FDC, verified, and is then passed back to the user where it can then be decrypted finally and accessed.

## Installation
1. Clone the repo:
```sh
git clone https://github.com/EonSolutions/Encode-Hackathon-2024.2.git
```
2. Open the ```flare``` folder:
```sh
cd flare
```
3. Install npm packages:

```sh
npm i
```
4. Run the app:
```sh
npm run dev
```
## Demo Usage

The demo we have provided is a stress tracker which uses an AI Agent to process inputted health data. We have provided an example dataset to mimic this data. Usage steps are below: 

1. Download the dataset JSON (downloadable from the example_datasets folder in the repo).
2. Run the app and login using your favourite wallet (this example uses MetaMask):

![alt text](./readme_images/image-1.png)
![alt text](./readme_images/image-2.png)

3. Upload the dataset JSON:
![alt text](./readme_images/image.png)

## Experience with Flare Statement
We have thoroughly enjoyed our time working with the Flare Network. We found an incredible use case for the Data Connector which allows us to validate requests sent to user hosted agents, which adds the needed layer of security to ensure truthiness of data processed. 

Although we struggled to implement the technology and our custom attestation type, the support we recieved from Flare mentors was invaluable, as they helped us identify flaws in our solution and ultimatly improved our understanding of the Flare Network in a way which we wouldn't have been able to do ourselves.

Thank you so much for this opportunity to work with your technology!

Tom, Wilbert, James
## Contact

- Tom Shtasel: veschi@gmail.com
- Wilbert Tham: wilbertthxm@gmail.com
- James Davenport: jamowaind@gmail.com
