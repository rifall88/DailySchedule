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
}

export default User;
