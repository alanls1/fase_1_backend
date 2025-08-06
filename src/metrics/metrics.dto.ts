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

export class findMetricDTO {
  @IsNotEmpty()
  @IsString()
  uid_usuarios!: string;
}

export class createNewMetricsDTO {
  @IsNotEmpty()
  @IsString()
  uid_usuarios!: string;

  @IsNotEmpty()
  @IsNumber()
  @IsDecimal()
  busto!: number;

  @IsNotEmpty()
  @IsNumber()
  @IsDecimal()
  torax!: number;

  @IsNotEmpty()
  @IsNumber()
  @IsDecimal()
  cintura!: number;

  @IsNotEmpty()
  @IsNumber()
  @IsDecimal()
  quadril!: number;

  @IsNotEmpty()
  @IsNumber()
  @IsDecimal()
  coxa!: number;

  @IsNotEmpty()
  @IsNumber()
  @IsDecimal()
  calcado!: number;
}

export class editMetricsDTO {
  @IsNotEmpty()
  @IsString()
  uid_medidas!: string;

  @IsString()
  uid_usuarios?: string;

  @IsNumber()
  @IsDecimal()
  busto?: number;

  @IsNumber()
  @IsDecimal()
  torax?: number;

  @IsNumber()
  @IsDecimal()
  cintura?: number;

  @IsNumber()
  @IsDecimal()
  quadril?: number;

  @IsNumber()
  @IsDecimal()
  coxa?: number;

  @IsNumber()
  @IsDecimal()
  calcado?: number;
}

export class deleteMetricsDTO {
  @IsNotEmpty()
  @IsString()
  uid_medidas!: string;
}
