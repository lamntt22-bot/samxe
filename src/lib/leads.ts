export const AUDIENCES = [
  { id: "nha-xe", label: "Nhà xe / vận tải" },
  { id: "tram-dung-nghi", label: "Trạm dừng nghỉ / du lịch" },
  { id: "tai-xe", label: "Tài xế cá nhân" },
] as const;

export type AudienceId = (typeof AUDIENCES)[number]["id"];

export const PRODUCTS = [
  { id: "trai-nghiem", label: "Gói Trải Nghiệm 10 Ngày — Miễn phí" },
  { id: "hanh-trinh", label: "Hộp Dự Trữ Hành Trình — 2.900.000đ" },
  { id: "co-thuong", label: "Hộp Dự Trữ Có Thưởng — 3.500.000đ" },
  { id: "vip", label: "Kho Dự Trữ Vạn Dặm VIP — 5.900.000đ" },
  { id: "chua-chac", label: "Chưa chắc — tư vấn giúp tôi" },
] as const;

export type ProductId = (typeof PRODUCTS)[number]["id"];

export interface LeadPayload {
  name: string;
  phone: string;
  email: string;
  audience: AudienceId;
  product?: ProductId;
  note?: string;
  /** honeypot field — must stay empty */
  website?: string;
}

export interface LeadRecord extends LeadPayload {
  id: string;
  createdAt: string;
}
