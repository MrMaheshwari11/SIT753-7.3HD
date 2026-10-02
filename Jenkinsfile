pipeline {
    agent any
    environment {
        APP_NAME = 'canteen-inventory-api'
        DOCKER_IMAGE = "canteen/${APP_NAME}"
        DOCKER_TAG = "${env.BUILD_NUMBER}"
        SONAR_PROJECT = "canteen-inventory"
    }
    stages {
        stage('Test') {
            steps {
                echo 'Running Jest Unit and Integration Tests...'
                bat 'npm install'
                bat 'npm test'
            }
        }
        stage('Code Quality') {
            steps {
                echo 'Running SonarQube Analysis...'
                bat 'npx sonar-scanner -Dsonar.projectKey=${SONAR_PROJECT} -Dsonar.sources=. -Dsonar.host.url=http://localhost:9000'
            }
        }
        stage('Build') {
            steps {
                echo 'Building Docker Image Artefact...'
                bat "docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} ."
            }
        }
        stage('Security') {
            steps {
                echo 'Running Trivy Vulnerability Scan...'
                bat "trivy image --severity HIGH,CRITICAL --exit-code 0 ${DOCKER_IMAGE}:${DOCKER_TAG}"
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying to Staging using Docker Compose...'
                bat "docker compose up -d"
            }
        }
        stage('Release') {
            steps {
                echo 'Promoting to Production: Tagging Release...'
                bat "docker tag ${DOCKER_IMAGE}:${DOCKER_TAG} ${DOCKER_IMAGE}:latest"
            }
        }
        stage('Monitoring') {
            steps {
                echo 'Pinging Application Health and Alerting Monitoring Tools...'
                bat 'curl -X POST "https://api.newrelic.com/v2/applications/YOUR_APP_ID/deployments.json" -H "Api-Key: DUMMY_API_KEY" -H "Content-Type: application/json" -d "{\\"deployment\\": {\\"revision\\": \\"Jenkins-Build\\", \\"description\\": \\"Deployed via Jenkins\\"}}"'
                bat 'timeout /t 5 /nobreak > NUL'
                bat 'curl -f http://localhost:3000/health'
            }
        }
    }
    post {
        always {
            echo 'Cleaning up test infrastructure...'
            bat "docker compose down"
        }
    }
}