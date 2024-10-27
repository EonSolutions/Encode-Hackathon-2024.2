# Welcome to **Sepia!**
**Sepia** is a secure framework designed to handle user data encryption, storage, and processing using Fully Homomorphic Encryption (FHE) integrated with the Flare Network's Data Connector for validation. This repository contains the core components of the Sepia technology.

## Key Features:
- Agent Validation using the FDC
- Fully Homomorphic Encryption of data during processing
- Support for AI Processing
### Key Components:

1. **Client**:
   - Responsible for generating and sending **raw data**.
   - Data is encrypted before it is transmitted to the **External Repository**.

2. **External Repository**:
   - Acts as a storage facility for **encrypted data** received from the client.
   - The data stored here remains secure and inaccessible to unauthorized parties.

3. **FHEAI Model Agents**:
   - Computation units that utilize **Fully Homomorphic Encryption** to process encrypted data without revealing sensitive information.
   - Multiple agents work in parallel, interacting with the **Attestation Providers** for security validations.

4. **Attestation Providers**:
   - Critical to ensuring trust within the network.
   - Responsible for verifying the legitimacy and security of data requests and responses between the client, FHEAI agents, and the **Flare Network**.

5. **Data Connector**:
   - Bridges the communication between SEPIA components and the **Flare Network**.
   - Facilitates secure data transmission and attestation processes.

6. **Flare Network**:
   - Provides decentralized attestation services to ensure trustworthiness and integrity in the computation and data handling process.
   - The **Data Connector** interacts with the network to retrieve and send requests/responses.

## Demo Usage

The demo we have provided is a stress tracker which uses an AI Agent to process inputted health data. Usage steps are below: 

1. Download the dataset file:
2. Run the app and login using your favourite wallet (this example uses MetaMask):
![alt text](./readme_images/image-1.png)
![alt text](./readme_images/image-2.png)

3. Upload the dataset JSON:
![alt text](./readme_images/image.png)
4. The app provides a stepper for you to view the backend's processes in realtime:

5.  

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

## Contact

- Tom Shtasel: veschi@gmail.com
- Wilbert Tham: wilbertthxm@gmail.com
- James Davenport: jamowaind@gmail.com
