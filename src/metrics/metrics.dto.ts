import { IsDecimal, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class loadMetricDTO {
  uid_medidas!: string;
  uid_usuarios!: string;
  busto!: number;
  torax!: number;
  cintura!: number;
  quadril!: number;
  coxa!: number;
  calcado!: number;
}

export class loadMetricByDTO {
  busto!: number;
  torax!: number;
  cintura!: number;
  quadril!: number;
  coxa!: number;
  calcado!: number;
}

export class findMetricDTO {
  @IsNotEmpty()
  @IsString()
  uid_usuarios!: string;
}

export class findMetricByCodeDTO {
  @IsNotEmpty()
  @IsString()
  codigo_publico!: string;
}

export class createNewMetricsDTO {
  @IsNotEmpty()
  @IsString()
  uid_usuarios!: string;

  @IsNotEmpty()
  @IsDecimal()
  busto!: number;

  @IsNotEmpty()
  @IsDecimal()
  torax!: number;

  @IsNotEmpty()
  @IsDecimal()
  cintura!: number;

  @IsNotEmpty()
  @IsDecimal()
  quadril!: number;

  @IsNotEmpty()
  @IsDecimal()
  coxa!: number;

  @IsNotEmpty()
  @IsDecimal()
  calcado!: number;
}

export class editMetricsDTO {
  @IsNotEmpty()
  @IsString()
  uid_medidas!: string;

  @IsString()
  uid_usuarios?: string;

  @IsDecimal()
  busto?: number;

  @IsDecimal()
  torax?: number;

  @IsDecimal()
  cintura?: number;

  @IsDecimal()
  quadril?: number;

  @IsDecimal()
  coxa?: number;

  @IsDecimal()
  calcado?: number;
}

export class deleteMetricsDTO {
  @IsNotEmpty()
  @IsString()
  uid_medidas!: string;
}
