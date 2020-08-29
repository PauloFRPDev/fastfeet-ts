import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateDeliveriesTable1598741578191
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'deliveries',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isGenerated: true,
            isPrimary: true,
          },
          {
            name: 'recipient_id',
            type: 'integer',
          },
          {
            name: 'deliveryman_id',
            type: 'integer',
          },
          {
            name: 'signature',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'product',
            type: 'varchar',
          },
          {
            name: 'canceled_at',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'start_date',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'end_date',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('deliveries');
  }
}
