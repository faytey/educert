# EduCert: Certificate Minter and Verifier DApp

EduCert is an innovative certification management platform that revolutionizes how organizations issue, manage, and verify certifications. By seamlessly integrating Ethereum Improvement Proposal 712 (EIP-712) and ERC1155 standards and deploying on the Avalanche Fuji network, EduCert provides a secure, transparent, and user-friendly solution for certification management.

## Features

- **Certificate Minting**: Organizations can easily mint certificates using the DApp by providing recipient details, certificate title, and description.

- **EIP-712 Signing**: Before minting a certificate, users are required to sign the certificate data using the EIP-712 standard, ensuring cryptographic security and preventing tampering of certificate details.

- **Certificate Verification**: Recipients and verifiers can use the DApp to verify the authenticity of certificates by inputting the certificate ID and verifying the signature against the stored data.

- **Factory Contract**: EduCert utilizes a factory contract to deploy child contracts for each certificate, ensuring efficient contract management and scalability.

- **Certificate NFT Contract**: Certificates minted through EduCert are represented as non-fungible tokens (NFTs) on the Avalanche Fuji network, providing unique and immutable representations of achievements.

## Deployment

The DApp frontend is deployed to [educert-six.vercel.app](https://educert-six.vercel.app) while the contracts are deployed on the Avalanche Fuji testnet, with the following contract addresses:

- **Factory Contract**: [0x6dF3343609306dA2CeE077f7d63ccA26FE3e61DF](https://testnet.snowtrace.io/address/0x6dF3343609306dA2CeE077f7d63ccA26FE3e61DF)

- **Certificate NFT Contract**: [0x07De2611C0C1f1023561f66c1c3F1cbDfA258665](https://testnet.snowtrace.io/address/0x07De2611C0C1f1023561f66c1c3F1cbDfA258665)

## Usage

1. Connect your wallet to the Avalanche Fuji testnet.
2. Visit the EduCert DApp website.
3. Mint a new certificate by providing recipient details, certificate title, and description.
4. Sign the certificate data using the EIP-712 standard.
5. Once signed, the certificate will be minted and represented as an NFT.
6. Recipients and verifiers can verify the authenticity of certificates using the provided verification feature.

## Contributing

Contributions to the EduCert project are welcome! If you have any suggestions, feature requests, or bug reports, feel free to open an issue or submit a pull request on our GitHub repository.

## License

This project is licensed under the [MIT License](LICENSE).


