import {
  Input,
  Text,
  HStack,
  Select,
  VStack,
  SimpleGrid,
  Button,
} from "@chakra-ui/react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import { app, database } from "../firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import QRCode from "qrcode.react";

// creates a collection instance with name "project"
const dbI = collection(database, "projects");

export default function Home() {
  // create an empty data structure. Not required tho.
  const [data, setData] = useState({
    academicYear: "",
    year: "",
    semester: "",
    subject: "",
    branch: "",
    projectType: "",
    projectTitle: "",
    m1: "",
    m2: "",
    m3: "",
    m4: "",
    m5: "",
    m6: "",
    concept: "-",
    presentation: "-",
    teamWork: "-",
    subjectKnowledge: "-",
    questionAnswer: "-",
    total: "0",
  });

  // A state for button to display loading in case if internet is slow, else its fast enough.
  const [loading, setloading] = useState(false);

  // store the document id once data is added in firebase.
  const [docId, setDID] = useState("");

  const [academicYearError, setAcademicYearError] = useState(false);

  // submit the data to firebase
  const onSubmit = () => {
    // check for empty fields. rough check.
    if (
      data.academicYear !== "" &&
      data.year !== "" &&
      data.semester !== "" &&
      data.subject !== "" &&
      data.branch !== "" &&
      data.projectType !== "" &&
      data.projectTitle !== "" &&
      !academicYearError
    ) {
      // lets just check for atleast one member.
      if (data.m1 !== "") {
        // set loading to true when data is being submitted.
        setloading(true);

        // push the data to collection instance.
        addDoc(dbI, data)
          .then((res) => {
            // If success and we get document id.
            if (res.id) {
              // set the document id.
              setDID(res.id);
              // set loading to false.
              setloading(false);
            } else alert("someting went wrong.");
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        alert("At least one member required");
      }
    } else {
      alert("Please fill all the fields");
    }
  };

  // function to handle the download of created qr code.
  const downloadQRCode = () => {
    // get the docuement of qr code.
    const qrCodeURL = document
      .getElementById("qrCodeEl")
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    // create a new document
    let aEl = document.createElement("a");
    // set the href to the document.
    aEl.href = qrCodeURL;
    // set a name
    //aEl.download = "QR_Code.png";
    aEl.download =
      data.academicYear +
      " " +
      data.year +
      " " +
      data.semester +
      " " +
      data.subject +
      " " +
      data.branch +
      " " +
      data.projectTitle +
      ".png";
    // append the document to the body.
    document.body.appendChild(aEl);
    // auto click the document.
    aEl.click();
    // remove once downloaded.
    document.body.removeChild(aEl);
    // clear data once submited.
    setData({
      academicYear: "",
      year: "",
      semester: "",
      subject: "",
      branch: "",
      projectType: "",
      projectTitle: "",
      m1: "",
      m2: "",
      m3: "",
      m4: "",
      m5: "",
      m6: "",
      concept: "-",
      presentation: "-",
      teamWork: "-",
      subjectKnowledge: "-",
      questionAnswer: "-",
      total: "-",
    });
    // clear code.
    setDID("");
  };

  const handleAcademicYearInput = (e) => {
    setData({ ...data, academicYear: e.target.value });

    let re = /^2\d{3}-[0-9][0-9]$/;

    if (re.test(e.target.value)) {
      setAcademicYearError(false);
    } else {
      setAcademicYearError(true);
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>ViAPP</title>
        <meta name="description" content="Generated by Vishwaniketan" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.logo}>
          <div>
            <img src="/logo.jpg" width={250} height={250} />
          </div>
          <h2 className={styles.title}>Project Details</h2>
        </div>

        <Text mb="8px">Acedmic Year</Text>
        <Input
          value={data.academicYear}
          maxLength={7}
          onChange={(e) => {
            handleAcademicYearInput(e);
          }}
          placeholder="E.g. 2022-23"
          size="md"
        />
        {academicYearError && (
          <Text className={styles.academicYearError}>
            Enter Academic Year in format e.g. 2022-23
          </Text>
        )}
        <HStack pt={"20px"}>
          <VStack alignItems={"flex-start"}>
            <Text mb="8px">Year</Text>
            <Select
              placeholder="---Select option---"
              value={data.year}
              onChange={(e) => {
                setData({ ...data, year: e.target.value });
              }}
            >
              <option value="First">First</option>
              <option value="Second">Second</option>
              <option value="Third">Third</option>
              <option value="Fourth">Fourth</option>
            </Select>
          </VStack>
          <VStack alignItems={"flex-start"}>
            <Text mb="8px">Semester</Text>
            <Select
              placeholder="---Select option---"
              value={data.semester}
              onChange={(e) => {
                setData({ ...data, semester: e.target.value });
              }}
            >
              <option value="I">Semester 1</option>
              <option value="II">Semester 2</option>
              <option value="III">Semester 3</option>
              <option value="IV">Semester 4</option>
              <option value="V">Semester 5</option>
              <option value="VI">Semester 6</option>
              <option value="VII">Semester 7</option>
              <option value="VIII">Semester 8</option>
            </Select>
          </VStack>
        </HStack>
        <HStack p={"20px 0"}>
          <VStack alignItems={"flex-start"}>
            <Text mb="8px">Subject/Technology</Text>
            <Input
              value={data.subject}
              onChange={(e) => {
                setData({ ...data, subject: e.target.value });
              }}
              placeholder="E.g. EM-I"
              size="md"
            />
          </VStack>
          <VStack alignItems={"flex-start"}>
            <Text mb="8px">Branch</Text>
            <Select
              placeholder="---Select option---"
              value={data.branch}
              onChange={(e) => {
                setData({ ...data, branch: e.target.value });
              }}
            >
              <option value="Computer">Computer Engineering</option>
              <option value="EXTC">EXTC Engineering</option>
              <option value="Civil">Civil Engineering</option>
              <option value="Mechanical">Mechanical Engineering</option>
              <option value="AIML">AI & ML</option>
              <option value="Electrical">Electrical Engineering</option>
            </Select>
          </VStack>
        </HStack>
        <Text mb="8px">Project Type</Text>
        <Select
          placeholder="---Select option---"
          value={data.projectType}
          onChange={(e) => {
            setData({ ...data, projectType: e.target.value });
          }}
        >
          <option value="Major">Major Project</option>
          <option value="Mini">Mini Project</option>
          <option value="VAP">VAP</option>
          <option value="CLPBL">CLPBL</option>
        </Select>
        <Text mb="8px" mt="20px">
          Project Title
        </Text>
        <Input
          value={data.projectTitle}
          onChange={(e) => {
            setData({ ...data, projectTitle: e.target.value });
          }}
          placeholder="Project Title"
          size="md"
        />
        <Text mb="8px" mt="20px">
          Project Members
        </Text>
        <SimpleGrid columns={2} spacing={6}>
          <Input
            value={data.m1}
            onChange={(e) => {
              setData({ ...data, m1: e.target.value });
            }}
            placeholder="Member 1 Name"
            size="md"
          />
          <Input
            value={data.m2}
            onChange={(e) => {
              setData({ ...data, m2: e.target.value });
            }}
            placeholder="Member 2 Name"
            size="md"
          />
          <Input
            value={data.m3}
            onChange={(e) => {
              setData({ ...data, m3: e.target.value });
            }}
            placeholder="Member 3 Name"
            size="md"
          />
          <Input
            value={data.m4}
            onChange={(e) => {
              setData({ ...data, m4: e.target.value });
            }}
            placeholder="Member 4 Name"
            size="md"
          />
          <Input
            value={data.m5}
            onChange={(e) => {
              setData({ ...data, m5: e.target.value });
            }}
            placeholder="Member 5 Name"
            size="md"
          />
          <Input
            value={data.m6}
            onChange={(e) => {
              setData({ ...data, m6: e.target.value });
            }}
            placeholder="Member 6 Name"
            size="md"
          />
        </SimpleGrid>

        {!docId && (
          <Button
            colorScheme="teal"
            variant="outline"
            mt="30px"
            onClick={() => onSubmit()}
            isLoading={loading}
          >
            Submit
          </Button>
        )}

        {docId && (
          <>
            <Text mt="30px" mb="20px">
              Your project details have been submitted. Your project id is{" "}
              <b>{docId}</b>
            </Text>
            <QRCode id="qrCodeEl" size={150} value={docId} />
            <Button
              colorScheme="teal"
              variant="outline"
              mt="30px"
              onClick={() => downloadQRCode()}
            >
              Download QR Code
            </Button>
          </>
        )}
      </main>
    </div>
  );
}
