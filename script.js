require('dotenv').config({ quiet: true });
const { MongoClient, ObjectId } = require('mongodb');
const readline = require('readline/promises');

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017";
const client = new MongoClient(uri);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function main() {
    try {
        await client.connect();
        console.log("Conectado a MongoDB");

        const db = client.db("empresa");
        const empleados = db.collection("empleados");

        let opcion;

        do {
            console.log("\n===== GESTIÓN DE EMPLEADOS =====");
            console.log("1. Insertar empleado");
            console.log("2. Consultar empleados");
            console.log("3. Modificar empleado");
            console.log("4. Eliminar empleado");
            console.log("0. Salir");

            opcion = await rl.question("Selecciona una opción: ");

            switch (opcion) {

                                // CREATE
                case "1":
                    const nombre = await rl.question("Nombre: ");
                    const edad = Number(await rl.question("Edad: "));
                    const departamento = await rl.question("Departamento: ");
                    const salario = Number(await rl.question("Salario: "));

                    await empleados.insertOne({
                        nombre,
                        edad,
                        departamento,
                        salario
                    });

                    console.log("Empleado insertado");
                    break;

                // READ
                case "2":
                    const datos = await empleados.find().toArray();
                    console.log("\nLISTADO DE EMPLEADOS");
                    console.table(datos);
                    break;

                                // UPDATE
                case "3":
                    const idModificar = await rl.question("ID del empleado: ");
                    const nuevoDepartamento = await rl.question("Nuevo departamento: ");

                    const resultadoUpdate = await empleados.updateOne(
                        { _id: new ObjectId(idModificar) },
                        { $set: { departamento: nuevoDepartamento } }
                    );

                    console.log("Documentos modificados:", resultadoUpdate.modifiedCount);
                    break;

                // DELETE
                case "4":
                    const idEliminar = await rl.question("ID del empleado: ");

                    const resultadoDelete = await empleados.deleteOne({
                        _id: new ObjectId(idEliminar)
                    });

                    console.log("Documentos eliminados:", resultadoDelete.deletedCount);
                    break;

                case "0":
                    console.log("Saliendo del programa");
                    break;

                default:
                    console.log("Opción incorrecta");
            }

        } while (opcion !== "0");

    } catch (error) {
        console.error("Error:", error);
    } finally {
        rl.close();
        await client.close();
    }
}

main();