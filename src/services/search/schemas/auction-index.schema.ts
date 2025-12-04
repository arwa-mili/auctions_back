import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'auction_indexes', timestamps: true })
export class AuctionIndex extends Document {
  @Prop({ required: true, unique: true })
  id: string;

  @Prop({ required: true })
  title: string;

  @Prop()
  startPrice: number;

  @Prop()
  endsAt: Date;

  @Prop()
  ownerId?: string;
}

export const AuctionIndexSchema = SchemaFactory.createForClass(AuctionIndex);
