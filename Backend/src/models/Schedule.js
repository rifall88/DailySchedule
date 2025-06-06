import prisma from "../database/dbConfig.js";

class Schedule {
  // Method untuk membuat jadwal baru
  static async create(scheduleData) {
    return prisma.schedule.create({
      data: scheduleData,
    });
  }

  // Method untuk mendapatkan semua jadwal
  static async findAll(userId = null) {
    const where = userId ? { user_id: parseInt(userId) } : {};
    return prisma.schedule.findMany({
      where,
      include: { User: true },
      orderBy: [{ date: "asc" }, { time: "asc" }],
    });
  }

  // Method untuk mendapatkan jadwal berdasarkan ID
  static async findById(id) {
    return prisma.schedule.findUnique({
      where: { id: parseInt(id) },
      include: { User: true },
    });
  }

  // Method untuk memperbarui jadwal
  static async update(id, scheduleData) {
    return prisma.schedule.update({
      where: { id: parseInt(id) },
      data: scheduleData,
    });
  }

  // Method untuk menghapus jadwal
  static async delete(id) {
    return prisma.schedule.delete({
      where: { id: parseInt(id) },
    });
  }
}
export default Schedule;
