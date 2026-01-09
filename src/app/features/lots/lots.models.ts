export interface CreateLotRequest {
  title: string;
  description: string;
  categoryId: number;
  conditionId: number;
  city: string;
}

export interface UpdateLotRequest extends CreateLotRequest {}

export interface LotImageDto {
  id: number;
  path: string;      // e.g. "lots/1/a.jpg"
  sortOrder: number;
  url?: string;      // optional computed in UI: base + "/uploads/" + path
}

export interface LotDto {
  id: number;
  sellerId: number;
  title: string;
  description: string;
  categoryId: number;
  conditionId: number;
  city: string;
  status: number | string;
  images: LotImageDto[];
}
