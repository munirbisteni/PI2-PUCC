export interface ComandoSQL<T> {
    sql: string;
    dados: T[];
  }