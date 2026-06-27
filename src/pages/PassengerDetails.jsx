import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getTrainById } from "../services/trainService";

const [searchParams] = useSearchParams();
const trainId = searchParams.get("trainId");
const cls = searchParams.get("class");
const [train, setTrain] = useState(null);

useEffect(() => {
  getTrainById(trainId).then(setTrain).catch(console.error);
}, [trainId]);