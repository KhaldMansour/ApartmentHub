import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateApartmentsTable1738905875915 implements MigrationInterface {
  name = 'CreateApartmentsTable1738905875915';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE TABLE `apartments` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `project` varchar(255) NOT NULL, `number` int NOT NULL, `price` float NOT NULL, INDEX `IDX_44a2e6df123f9369a2041c5411` (`name`), INDEX `IDX_63fd62c792101debaf899df175` (`project`), PRIMARY KEY (`id`)) ENGINE=InnoDB');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP INDEX `IDX_63fd62c792101debaf899df175` ON `apartments`');
    await queryRunner.query('DROP INDEX `IDX_44a2e6df123f9369a2041c5411` ON `apartments`');
    await queryRunner.query('DROP TABLE `apartments`');
  }
}
