# FaaSCompose
Graphical User Interface for Composing FaaS Workflows

## Background
There are a variety of Function as a Service (FaaS) providers in the marketplace, including IBM Cloud Functions, Amazon/AWS Lambda, Azure Functions, and Google Cloud Functions. These providers issue functions in a proprietary manner, using their own methods and syntax for creating FaaS workflows. To work with each provider, you will need to write those functions with specific signatures in order for them to be readable by or usable on each of the respective platforms. Each provider’s implementation signature is slightly different from one another. This is also true with the composition and orchestration of those functions on larger workflows. Each provider has its own way to build and represent those workflows. This creates vendor lock-in. Therefore, a set of functions and a composition built for one provider will not work on a different platform.

FaaSCompose aims to solve this problem by allowing the creation of functions and the associated workflows in an agnostic manner for subsequent conversion and execution on multiple cloud FaaS Providers. So far, the only cloud provider supported is IBM Cloud Functions, but in the future, we would like to include more options. IBM currently does not provide a GUI for composing workflows, which is why we chose to work on this provider first.

## How to Use

## Roadmap

## Contributing

## License
