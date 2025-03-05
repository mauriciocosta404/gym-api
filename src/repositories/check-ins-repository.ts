import { checkIn, Prisma } from "@prisma/client";

export interface CheckInsRepository{
    create(data: Prisma.checkInUncheckedCreateInput) : Promise<checkIn>; 
    findByUserIdOnDate(userId: string, date: Date): Promise<checkIn | null>;   
}