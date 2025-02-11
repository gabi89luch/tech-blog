variable "github_token" {
  description = "GitHub Personal Access Token"
  type        = string
  sensitive   = true
}

variable "jenkins_webhook_url" {
  description = "Jenkins webhook URL"
  type        = string
}

variable "azure_location" {
  description = "Azure region"
  type        = string
  default     = "West Europe"
}

variable "vm_size" {
  description = "Size of the Jenkins VM"
  type        = string
  default     = "Standard_B2s"
}

variable "admin_username" {
  description = "Admin username for the Jenkins VM"
  type        = string
  default     = "adminuser"
}
