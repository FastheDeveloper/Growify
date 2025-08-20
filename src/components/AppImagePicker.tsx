import {
  Alert,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Image,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import CameraIcon from '../assets/svgs/CameraIcon';
import AppText from './AppText';
import Svg, { Rect } from 'react-native-svg';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import AppButton from './AppButton';
import ImageIcon from '../assets/svgs/ImageIcon';
import CloseIcon from '../assets/svgs/CloseIcon';

export interface AppImagePickerProps {
  label?: string;
  labelClassname?: string;
  isRequired?: boolean;
  onChange?: (uris: string[]) => void; // emits internal array
  onFilledChange?: (filled: boolean, pickedImages?: string[]) => void;

  containerStyle?: StyleProp<ViewStyle>;
  errorMessage?: string;
}

const screenWidth = Dimensions.get('window').width;

const AppImagePicker: React.FC<AppImagePickerProps> = ({
  label,
  labelClassname,
  isRequired = false,
  onChange,
  onFilledChange,
  containerStyle,
  errorMessage,
}) => {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [cameraOpen, setCameraOpen] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [capturedPhotos, setCapturedPhotos] = useState<string[]>([]);
  const cameraRef = useRef<any>(null);

  useEffect(() => {
    onFilledChange?.(capturedPhotos.length > 0, capturedPhotos);
  }, [capturedPhotos, onFilledChange]);

  const openCamera = async () => {
    if (!permission) return;
    if (!permission.granted) {
      const granted = await requestPermission();
      if (!granted.granted) {
        Alert.alert('Permission Denied', 'Camera access is required to take pictures.');
        return;
      }
    }
    setCapturedPhoto(null);
    setCameraOpen(true);
  };

  const takePhoto = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setCapturedPhoto(photo.uri);
    }
  };

  const submitPhoto = () => {
    if (capturedPhoto) {
      const updated = [...capturedPhotos, capturedPhoto];
      setCapturedPhotos(updated);
      onChange?.(updated);
    }
    setCapturedPhoto(null);
    setCameraOpen(false);
  };

  const removeImage = (uri: string) => {
    const updated = capturedPhotos.filter((img) => img !== uri);
    setCapturedPhotos(updated);
    onChange?.(updated);
  };

  const getFileName = (uri: string) => {
    const parts = uri.split('/');
    const lastPart = parts[parts.length - 1] || '';
    const dashSplit = lastPart.split('-');
    const finalName = dashSplit[dashSplit.length - 1]; // after last dash
    return `IMG_${finalName.toUpperCase()}`;
  };

  return (
    <View className="mb-4 flex flex-col" style={containerStyle}>
      {label && (
        <Text
          className={[`mb-2 font-INTER_SEMIBOLD text-base text-[#1A1A1A]`, labelClassname].join(
            ' '
          )}>
          {label}
          {isRequired && <Text style={{ color: 'red' }}> *</Text>}
        </Text>
      )}

      {/* Image picker dashed box - Full Width */}
      <TouchableOpacity onPress={openCamera} activeOpacity={0.7}>
        <View style={{ position: 'relative', minHeight: 50 }}>
          {/* Full width SVG border */}
          <Svg
            height="50"
            width="100%"
            style={{
              position: 'absolute',
              top: -1,
              left: 0,
              right: 0,
              zIndex: 1,
            }}>
            <Rect
              x="0"
              y="0"
              width="100%"
              height="100%"
              stroke="#B3B3B3"
              strokeWidth="1.5"
              strokeDasharray="8 6"
              fill="none"
              rx="8"
              ry="8"
            />
          </Svg>

          {/* Content inside the border */}
          <View
            className="flex-row items-center gap-3"
            style={{
              paddingHorizontal: 12,
              paddingTop: 4,
              zIndex: 2,
              position: 'relative',
            }}>
            <CameraIcon width={40} height={40} />
            <AppText className="font-INTER_REGULAR text-sm text-[#4D4D4D]">
              Take pictures of task -{' '}
              <AppText className="font-INTER_MEDIUM text-sm text-[#070707]">Open Camera</AppText>
            </AppText>
          </View>
        </View>
      </TouchableOpacity>

      {/* Multiple Images Preview */}
      {capturedPhotos.length > 0 && (
        <View className="mt-4 gap-3">
          {capturedPhotos.map((uri, idx) => (
            <View key={idx} className="rounded-lg bg-[#F2F2F2] px-4 py-2">
              <View className="flex-row items-center justify-between">
                <View className=" flex-row items-center gap-4">
                  <ImageIcon width={32} height={32} />
                  <View>
                    <AppText className="font-INTER_MEDIUM text-base text-[#333333]">
                      {getFileName(uri)}
                    </AppText>
                    <AppText className="font-INTER_REGULAR text-sm text-[#666666] ">
                      92 kb • Uploaded
                    </AppText>
                  </View>
                </View>
                <TouchableOpacity onPress={() => removeImage(uri)}>
                  <CloseIcon width={24} height={24} />
                </TouchableOpacity>
              </View>
              <View className=" my-3 h-2 w-full rounded-lg bg-white">
                <View className=" h-2 w-full rounded-lg bg-PRIMARY_COLOR" />
              </View>
            </View>
          ))}
        </View>
      )}

      {errorMessage && <Text style={{ color: 'red', marginTop: 4 }}>{errorMessage}</Text>}

      {/* Camera modal */}
      <Modal visible={cameraOpen} animationType="slide">
        {capturedPhoto ? (
          // Show preview after capture
          <View style={{ flex: 1, backgroundColor: '#000' }}>
            <Image source={{ uri: capturedPhoto }} style={{ flex: 1 }} resizeMode="contain" />
            <View className="gap-4 p-4">
              <AppButton label="Submit Picture" onPress={submitPhoto} />
              <AppButton
                label="Retake Picture"
                variant="secondary"
                onPress={() => setCapturedPhoto(null)}
                textStyle={{ color: 'white' }}
              />
            </View>
          </View>
        ) : (
          // Show camera before capture
          <>
            <CameraView ref={cameraRef} style={{ flex: 1 }} facing={facing} />
            <View style={styles.cameraControls}>
              <View />
              <TouchableOpacity
                onPress={takePhoto}
                className="rounded-full border-2 border-white p-1">
                <View className="h-20 w-20 rounded-full bg-PRIMARY_COLOR" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setCameraOpen(false)} className="justify-center">
                <Text style={styles.buttonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Modal>
    </View>
  );
};

export default AppImagePicker;

const styles = StyleSheet.create({
  cameraControls: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
