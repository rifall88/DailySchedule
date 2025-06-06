import prisma from "../database/dbConfig.js";

class User {
  // Method untuk membuat user baru
  static async create(userData) {
    return prisma.user.create({
      // Menggunakan prisma.user (singular)
      data: userData,
    });
  }

  // Method untuk mencari user berdasarkan email
  static async findByEmail(email) {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  // Method untuk mencari user berdasarkan ID
  static async findById(id) {
    return prisma.user.findUnique({
      where: { id: parseInt(id) }, // Pastikan ID diubah ke integer
    });
  }

  // Method untuk memperbarui user
  static async update(id, userData) {
    return prisma.user.update({
      where: { id: parseInt(id) },
      data: userData,
    });
  }

  // Method untuk menghapus user
  static async delete(id) {
    return prisma.user.delete({
      where: { id: parseInt(id) },
    });
  }
}

export default User;