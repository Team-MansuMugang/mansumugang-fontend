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
  const [voiceMessages, setVoiceMessages] = useState([]);

  useEffect(() => {
    const loadPatients = async () => {
      try {
        const patients = await fetchPatientList();
        setPatients(patients);
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
            disabled={selectedPatient === -1 ? true : false}
            onclick={() => {
              setSelectedPatient(-1);
            }}
          >
            전체
          </TagButton>
          {patients.map((patient, index) => (
            <TagButton
              key={index}
              disabled={selectedPatient === index ? true : false}
              onclick={() => {
                setSelectedPatient(index);
              }}
            >
              {patient.patientName}
            </TagButton>
          ))}
        </div>

        <div className="Large-voice-Message">
          {voiceMessages.map((vocieMessage, index) => (
            <LargeVoiceMessageItem
              key={index}
              profileImage={'https://picsum.photos/200/300'}
              name={vocieMessage.name}
              dateTime={vocieMessage.uploadedTime}
              onClick={() => {
                navigate('/voice-message/detail', { state: voiceMessages[index] });
              }}
            ></LargeVoiceMessageItem>
          ))}
        </div>
      </div>
    </>
  );
};

export default VoiceMessagePage;
