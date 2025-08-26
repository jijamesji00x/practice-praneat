# main.tf

# 1. ตั้งค่า Provider ที่จะใช้
# เราจะใช้ provider "local" ซึ่งเป็น provider พิเศษสำหรับจัดการไฟล์บนเครื่อง
terraform {
  required_providers {
    local = {
      source  = "hashicorp/local"
      version = "~> 2.5"
    }
  }
}

# 2. สร้าง Resource
# เราจะสร้าง resource ประเภท "local_file"
resource "local_file" "hello_world" {
  # เนื้อหาที่จะใส่เข้าไปในไฟล์
  content = "Hello, Atlantis and Terraform! This file was created automatically."

  # ชื่อและตำแหน่งของไฟล์ที่จะสร้าง
  # ${path.module} หมายถึงให้สร้างในโฟลเดอร์เดียวกันกับไฟล์ .tf นี้
  filename = "${path.module}/hello.txt"
}
