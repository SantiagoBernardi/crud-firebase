// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc, DocumentData, query } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAR1yNyKe7FG0kcvU4jCSsSG0hLQgH0uvA",
  authDomain: "prueba-cfc01.firebaseapp.com",
  projectId: "prueba-cfc01",
  storageBucket: "prueba-cfc01.appspot.com",
  messagingSenderId: "88437342673",
  appId: "1:88437342673:web:30599c7aa73a2895a520f0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

interface Anuro {
  id: string;
  especie: string;
  // Aquí puedes agregar otras propiedades del usuario si las tienes
}

// Agregar un nuevo documento a la colección "usuarios"
export async function agregarAnuros(especie: string, familia: string, conservacion: string) {
  try {
    const docRef = await addDoc(collection(db, "Anuros"), {
      especie: especie,
      familia: familia,
      conservacion: conservacion
    });
    console.log("tu ranita se añadio con ID: ", docRef.id);
  } catch (error) {
    console.error("Error al agregar tu ranita: ", error);
  }
}

export async function obtenerAnuros() {
  try {
    const anurosCollection = collection(db, 'Anuros');
    const querySnapshot = await getDocs(anurosCollection);
    const queryData = querySnapshot.docs
    const anuros = queryData.map((doc) => ({
      id: doc.id,
      especie: doc.data().especie,
      familia: doc.data().familia,
      conservacion: doc.data().conservacion
    }));
    return anuros;
  } catch (error) {
    console.error("Error al obtener usuarios: ", error);
    return [];
  }
}

export async function eliminarAnuro(Id: string) {
  try {
    const userRef = doc(db, "Anuros", Id);
    await deleteDoc(userRef);
    console.log("Ranita eliminado correctamente");
  } catch (error) {
    console.error("Error al eliminar ranita: ", error);
  }
}

export async function modificarAnuro (Id: string, nuevaEspecie: string, nuevaFamilia: string, nuevaConservacion: string) {
  try {
    const userRef = doc(db, "Anuros", Id);
    await updateDoc(userRef, {
      especie: nuevaEspecie,
      familia: nuevaFamilia,
      conservacion: nuevaConservacion
    });
    console.log("Anuro actualizado correctamente");
  } catch (error) {
    console.error("Error al actualizar Anuro: ", error);
  }
}

