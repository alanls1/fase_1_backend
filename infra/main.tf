###########################################
# Provedor AWS
###########################################
provider "aws" {
  region = "us-east-1"
}

###########################################
# Servidor EC2 para o backend
###########################################
resource "aws_instance" "backend_server" {
  ami           = "ami-0c55b159cbfafe1f0" # Ubuntu Server 20.04 (exemplo)
  instance_type = "t2.micro"

  tags = {
    Name = "SistemaMedidasBackend"
    Projeto = "Sistema de Medidas Pessoais"
  }
}

###########################################
# Saída (output) com IP do servidor
###########################################
output "backend_server_ip" {
  description = "Endereço IP público do servidor backend"
  value       = aws_instance.backend_server.public_ip
}

