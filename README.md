
# Kubernautical

![JavaScript](https://img.shields.io/badge/javascript-black?style=for-the-badge&logo=javascript&logoColor=yellow)
![TypeScript](https://img.shields.io/badge/typescript-black?style=for-the-badge&logo=typescript&logoColor=%233178C6)
![NodeJS](https://img.shields.io/badge/Nodejs-black?style=for-the-badge&logo=node.js&logoColor=%23339933)
![Express.js](https://img.shields.io/badge/expressjs-black?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![React](https://img.shields.io/badge/react-black?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Jest](https://img.shields.io/badge/jest-black?style=for-the-badge&logo=jest&logoColor=%23C21325)
![Docker](https://img.shields.io/badge/docker-black?style=for-the-badge&logo=docker&logoColor=%232496ED)
![Kubernetes](https://img.shields.io/badge/kubernetes-black?style=for-the-badge&logo=kubernetes&logoColor=%23326CE5)
![Prometheus](https://img.shields.io/badge/prometheus-black?style=for-the-badge&logo=prometheus&logoColor=%23E6522C)
![Grafana](https://img.shields.io/badge/grafana-black?style=for-the-badge&logo=grafana&logoColor=%23F46800)
![ChartJS](https://img.shields.io/badge/chart.js-black?style=for-the-badge&logo=chart.js&logoColor=%23FF6384)
![React-graph-vis]()
![Helm]()
![GKE](https://img.shields.io/badge/GKE-black?style=for-the-badge&logo=googlecloud&logoColor=%234285F4)
## Set Up
### Helm and Prometheus
1. Install Helm
   - If you use macOS, run: ` brew install helm `
   - If you use Windows, run: ` choco install kubernetes-helm `
   - If you use Linux, run:
  
     NOTE: refer to this link for more details: https://kubernetes.io/docs/tasks/tools/
2. Connect Prometheus using Helm
  - Create a Prometheus namespace
   `kubectl create namespace prometheus`
  - Add the prometheus-comunity chart repository
    `helm repo add prometheus-community https://prometheus-community.github.io/helm-charts`
  - Deploy Prometheus
    ` helm upgrade -i prometheus prometheus-community/prometheus \
    --namespace prometheus \
    --set alertmanager.persistentVolume.storageClass="standard-rwo",server.persistentVolume.storageClass="standard-rwo"`
  
      <br><br>
### Terminal Commands
1. Fork this repository and clone it onto your local machine:
    `git clone https://github.com/oslabs-beta/Kubernautical`
1. Run `npm install` to install all package dependencies
# Contributing
Contributions play a vital role in the open-source community. Any contributions are greatly appreciated!

- Fork the project.
- Create and work off of your feature branch.
- Create a pull request with detailed description of your changes from your feature branch to dev branch.
- Inform us upon PR submission. Once the changes are reviewed and approved, we will merge your code into the main repository.

# Meet the Team
 ![Jeremiah Hogue](client/assets/images/kitten.png) | ![Anthony Vuong](client/assets/images/kitten.png) | ![Stephen Acosta](client/assets/images/kitten.png) |  ![Michael Van](client/assets/images/kitten.png) |
| ------------- | ------------- |------------- | ------------- |
| Jeremiah Hogue [<img src="https://cdn.icon-icons.com/icons2/2351/PNG/512/logo_github_icon_143196.png" width="30px" >](https://github.com/NotHogue)  [<img src="https://www.freeiconspng.com/uploads/linkedin-icon-19.png" width="30px" >](https://www.linkedin.com/in/jeremiah-hogue/)| Anthony Vuong [<img src="https://cdn.icon-icons.com/icons2/2351/PNG/512/logo_github_icon_143196.png" width="30px" >](https://github.com/AnthonyKTVuong) [<img src="https://www.freeiconspng.com/uploads/linkedin-icon-19.png" width="30px" >](https://www.linkedin.com/in/anthony-v-9772351b7/) | Stephen Acosta  [<img src="https://cdn.icon-icons.com/icons2/2351/PNG/512/logo_github_icon_143196.png" width="30px" >](https://github.com/STAC98) [<img src="https://www.freeiconspng.com/uploads/linkedin-icon-19.png" width="30px" >](https://www.linkedin.com/in/sacosta756/)  | Michael Van [<img src="https://cdn.icon-icons.com/icons2/2351/PNG/512/logo_github_icon_143196.png" width="30px" >](https://github.com/michaelvan996) [<img src="https://www.freeiconspng.com/uploads/linkedin-icon-19.png" width="30px" >](https://www.linkedin.com/in/michael-van-901533222/) |