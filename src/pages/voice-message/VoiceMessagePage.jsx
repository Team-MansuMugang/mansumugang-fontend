// import { BigButton, CheckButton, Input, InputWrapper } from '../../components/components';
import { useNavigate } from 'react-router-dom';
import './VoiceMessagePage.css';
import LargeVoiceMessageItem from '../../components/LargeVoiceMessageItem';
import MainHeader from '../../components/MainHeader';
import NavBar from '../../components/NavBar';
import TagButton from '../../components/TagButton';
import { useEffect, useState } from 'react';
import fetchPatientList from '../../apis/api/fetchPatientList';
import fetchAllPatientVocieMessageList from '../../apis/api/fetchAllPatientVocieMessageList';
import fetchPatientVocieMessageList from '../../apis/api/fetchPatientVocieMessageList';
import { UserRecordInfoNotFoundError } from '../../apis/utility/errors';

const VoiceMessagePage = () => {
  const navigate = useNavigate();

  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(-1);
  const [voiceMessages, setVoiceMessages] = useState(null);
  console.log(voiceMessages);

  useEffect(() => {
    const loadPatients = async () => {
      try {
        const patients = await fetchPatientList();
        setPatients(patients.patients);
      } catch (error) {
        console.error('Failed to load patients:', error);
      }
    };

    loadPatients();
  }, []);

  useEffect(() => {
    const loadAllPatientVocieMessages = async () => {
      try {
        const voiceMessages = await fetchAllPatientVocieMessageList();
        setVoiceMessages(voiceMessages);
      } catch (error) {
        if (error instanceof UserRecordInfoNotFoundError) {
          setVoiceMessages([]);
        } else {
          console.error('Failed to load all patient voice messages:', error);
        }
      }
    };

    const loadPatientVocieMessages = async () => {
      try {
        const voiceMessages = await fetchPatientVocieMessageList(
          patients[selectedPatient].patientId,
        );
        setVoiceMessages(voiceMessages);
      } catch (error) {
        if (error instanceof UserRecordInfoNotFoundError) {
          setVoiceMessages([]);
        } else {
          console.error('Failed to load patient voice messages:', error);
        }
      }
    };

    if (selectedPatient === -1) {
      loadAllPatientVocieMessages();
    } else {
      loadPatientVocieMessages();
    }
  }, [selectedPatient]);

  return (
    <>
      <NavBar></NavBar>
      <MainHeader
        title="음성 메세지"
        onClickLeft={() => {
          navigate('/home');
        }}
      ></MainHeader>
      <div className="voice-message-control">
        <div className="tag-item">
          <TagButton
            selected={selectedPatient === -1}
            onClick={() => {
              setSelectedPatient(-1);
            }}
          >
            전체
          </TagButton>
          {patients.map((patient, index) => (
            <TagButton
              key={index}
              selected={selectedPatient === index}
              onClick={() => {
                setSelectedPatient(index);
              }}
            >
              {patient.patientName}
            </TagButton>
          ))}
        </div>

        <div className="large-voice-message">
          {voiceMessages !== null &&
            voiceMessages.records?.map((voiceMessage, index) => (
              <LargeVoiceMessageItem
                key={index}
                profileImage={
                  voiceMessage.profileImageName !== null
                    ? `${voiceMessages.imageApiUrl}${voiceMessage.profileImageName}`
                    : null
                }
                name={voiceMessage.name}
                dateTime={voiceMessage.uploadedTime}
                onClick={() => {
                  navigate('/voice-message/detail', {
                    state: {
                      imageApiUrlPrefix: voiceMessages.imageApiUrl,
                      audioApiUrlPrefix: voiceMessages.audioApiUrlPrefix,
                      voiceMessage,
                    },
                  });
                }}
              ></LargeVoiceMessageItem>
            ))}
        </div>
      </div>
    </>
  );
};

export default VoiceMessagePage;
