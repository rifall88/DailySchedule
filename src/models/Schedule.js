import prisma from "../database/dbConfig.js";

class Schedule {
  // Method untuk membuat jadwal baru
  static async create(scheduleData) {
    return prisma.schedule.create({
      data: scheduleData,
    });
  }

  // Method untuk mendapatkan semua jadwal
  static async findAll(userId) {
    return prisma.schedule.findMany({
      where: { user_id: userId },
      include: { User: true },
      orderBy: [{ date: "asc" }, { time: "asc" }],
    });
  }

  // Method untuk mendapatkan jadwal berdasarkan ID
  static async findById(id, userId) {
    return prisma.schedule.findFirst({
      where: { id: parseInt(id), user_id: userId },
      include: { User: true },
    });
  }

  // Method untuk memperbarui jadwal
  static async update(id, userId, scheduleData) {
    return prisma.schedule.update({
      where: { id: parseInt(id), user_id: userId },
      data: scheduleData,
    });
  }

  // Method untuk menghapus jadwal
  static async delete(id, userId) {
    return prisma.schedule.delete({
      where: { id: parseInt(id), user_id: userId },
    });
  }
}
export default Schedule;
