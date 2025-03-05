import { checkIn, Prisma } from "@prisma/client";
import { CheckInsRepository } from "../check-ins-repository";
import { randomUUID } from "node:crypto";
import dayjs from "dayjs";

export class InMemoryCheckInsRepository implements CheckInsRepository{
    public items : checkIn[]= [];

    async create(data: Prisma.checkInUncheckedCreateInput): Promise<checkIn> {
        const checkin = {
            id: randomUUID(),
            user_id: data.user_id,
            gym_id: data.gym_id,
            validated_at: data.validated_at ? new Date(data.validated_at) : null,
            created_at: new Date()
        };

        this.items.push(checkin);

        return checkin;
    }
 
    async findByUserIdOnDate(userId: string, date: Date) {
        const startOfTheDay = dayjs(date).startOf('date');
        const endOfTheDay = dayjs(date).endOf('date');

        const checkinOnSameDate  =  this.items.find((checkIn) => {
            const checkInDate = dayjs(checkIn.created_at);
            const isOnSameDate = checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay);

            return checkIn.user_id ===  userId && isOnSameDate;
        });

        if(!checkinOnSameDate){
            return null;
        }

        return checkinOnSameDate;
    }
}