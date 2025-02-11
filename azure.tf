terraform {
  required_providers {
    github = {
      source  = "integrations/github"
      version = "~> 5.0"
    }
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.0"
    }
  }
  
  # Using Azure Storage for Terraform state (more secure than local)
  backend "azurerm" {
    resource_group_name  = "rg-terraform-state"
    storage_account_name = "tfstateblog${random_string.storage_account_suffix.result}"
    container_name      = "tfstate"
    key                 = "blog.terraform.tfstate"
  }
}

# Random string for unique storage account name
resource "random_string" "storage_account_suffix" {
  length  = 8
  special = false
  upper   = false
}

provider "azurerm" {
  features {}
}

# Resource Group for Jenkins
resource "azurerm_resource_group" "jenkins" {
  name     = "rg-jenkins-blog"
  location = "West Europe"  # or your preferred Azure region
  
  tags = {
    Environment = "Production"
    Project     = "Blog"
  }
}

# Network Security Group
resource "azurerm_network_security_group" "jenkins" {
  name                = "nsg-jenkins"
  location            = azurerm_resource_group.jenkins.location
  resource_group_name = azurerm_resource_group.jenkins.name

  security_rule {
    name                       = "allow-jenkins"
    priority                   = 100
    direction                  = "Inbound"
    access                     = "Allow"
    protocol                   = "Tcp"
    source_port_range          = "*"
    destination_port_range     = "8080"
    source_address_prefix      = "*
