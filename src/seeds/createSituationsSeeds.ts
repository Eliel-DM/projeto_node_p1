import { DataSource } from "typeorm";
import { Situation } from "../entity/situations";

export default class CreateSituationsSeeds {
  public async run(datasource: DataSource): Promise<void> {
    console.log("⚠️ Start Seeds Situation. ");

    const situationRepository = datasource.getRepository(Situation);
    const existingCount = await situationRepository.count();

    if (existingCount > 0) {
      console.log(
        "A tabela 'situations' já tem dados cadastrados. Nenhuma alteração foi feita!"
      );
      return;
    }
    const situations = [
      { nameSituation: "Ativo" },
      { nameSituation: "Inativo" },
      { nameSituation: "Pendente" },
    ];
    await situationRepository.save(situations);
    console.log("✅ Situações cadastradas! ");
  }
}
