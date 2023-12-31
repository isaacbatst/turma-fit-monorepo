import SectionTitle from "../../components/SectionTitle";
import CreateEquipmentForm from "./CreateEquipmentForm";
import EquipmentsList from "./EquipmentsList";


export default async function Equipments() {
  return (
    <section>
      <SectionTitle>Equipamentos</SectionTitle>
      <ul className="grid xl:grid-cols-2 2xl:grid-cols-3 gap-3 my-10">
        <CreateEquipmentForm />
        <EquipmentsList />
      </ul>
    </section>
  );
}
