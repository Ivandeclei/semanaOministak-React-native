import React, {useEffect, useState} from 'react';
import { View, Image, Text, TouchableOpacity, Linking } from 'react-native';
import {Feather} from '@expo/vector-icons';
import {useNavigation, useRoute} from '@react-navigation/native';
import logoImg from '../../assets/logo.png';
import * as MailComposer from 'expo-mail-composer';
import api from '../../services/api';

import styles from './styles';

export default function Detail() {
    const navigation = useNavigation();
    const route = useRoute();

    const incident = route.params.incident;
    const message = `ola ${incident.name} estou entrando em contato  para ajudar no caso "${incident.title}"  com o valor de ${Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(incident.value)}`;

    function navigateBack(){
        navigation.goBack();
    }

    function sendMail() {
        MailComposer.composeAsync({
            subject:`Heroi do caso: ${incident.title} `,
            recipients: [incident.email],
            body: message
        })
    }

    function sendWhatsapp() {
        Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`);
    }

    
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <TouchableOpacity onPress={navigateBack}>
                    <Feather name="arrow-left" size={28} color="#E02041" />
                </TouchableOpacity>
            </View>
            <View style={styles.incident}>
            <Text style={styles.incidentProperty}>ONG:</Text>
                    <Text style={styles.incidentValue}>{incident.name} de {incident.city}/{incident.uf}</Text>

                    <Text style={styles.incidentProperty}>Caso:</Text>
                    <Text style={styles.incidentValue}>{incident.description}</Text>

                    <Text style={styles.incidentProperty}>VALOR:</Text>
                    <Text style={styles.incidentValue}>R$ {incident.value}</Text>
            </View>
            <View style={styles.contactBox}>
                <Text style={styles.heroTitle}>Salve o dia!</Text>
                <Text style={styles.heroTitle}>Seja o heroi desse caso!</Text>

                <Text style={styles.heroTitle}>Entre em contato!</Text>

                <View style={styles.actions}>
                    <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
                        <Text style={styles.actionText}>Whatsapp</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.action} onPress={sendMail}>
                        <Text style={styles.actionText}>E-mail</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </View>
    );
}