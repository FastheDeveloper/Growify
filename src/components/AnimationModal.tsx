import React, { useRef, useState, useEffect } from 'react';
import { View, Modal, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import LottieView from 'lottie-react-native';

interface LottieModalProps {
  visible: boolean;
  animation: any; // JSON file for Lottie
  title?: string;
  subtitle?: string;
  loop?: boolean;
  onClose: () => void;
}

const LottieModal: React.FC<LottieModalProps> = ({
  visible,
  animation,
  title,
  subtitle,
  loop = false,
  onClose,
}) => {
  const animationRef = useRef<LottieView>(null);
  const [finished, setFinished] = useState(false);

  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      scaleAnim.setValue(0.8);
      opacityAnim.setValue(0);
      setFinished(false);
    }
  }, [visible]);

  return (
    <Modal transparent animationType="fade" visible={visible}>
      <View style={styles.overlay}>
        <Animated.View
          style={[styles.container, { transform: [{ scale: scaleAnim }], opacity: opacityAnim }]}>
          {/* X button */}
          {(finished || loop) && (
            <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
              <Text style={styles.closeText}>×</Text>
            </TouchableOpacity>
          )}

          <LottieView
            ref={animationRef}
            source={animation}
            autoPlay
            loop={loop}
            style={styles.animation}
            onAnimationFinish={() => {
              if (!loop) setFinished(true);
            }}
          />

          {title ? <Text style={styles.title}>{title}</Text> : null}
          {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        </Animated.View>
      </View>
    </Modal>
  );
};

export default LottieModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 16,
    position: 'relative',
  },
  animation: {
    width: 250,
    height: 250,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    marginTop: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#ddd',
    marginTop: 8,
    textAlign: 'center',
  },
  closeIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 10,
    padding: 5,
  },
  closeText: {
    fontSize: 28,
    color: '#fff',
    fontWeight: '600',
  },
});
