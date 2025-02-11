variable "github_token" {
  description = "GitHub Personal Access Token"
  type        = string
  sensitive   = true
}

variable "jenkins_webhook_url" {
  description = "Jenkins webhook URL"
  type        = string
}
