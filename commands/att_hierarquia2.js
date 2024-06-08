const { Client, Intents, SlashCommandBuilder } = require('discord.js');


// Defina a variável isExecuting
let isExecuting = false;

const roles = [
    { id: '1248073011857326088', name: 'COMANDO GERAL' },
    { id: '1248073011857326087', name: 'SUB COMANDO GERAL' },
    { id: '1248073011857326086', name: 'DELEGADO PECERJ' },
    { id: '1248073011857326085', name: 'COMANDO SAER' },
    { id: '1248073011857326084', name: 'SUBCOMANDO SAER' },
    { id: '1248073011857326083', name: 'CAPITÃO SAER' },
    { id: '1248073011844612106', name: 'INSTRUTOR PILOTO SAER' },
    { id: '1248073011844612105', name: 'INSTRUTOR SAER' },
    { id: '1248073011832291390', name: 'ELITE SAER' },
    { id: '1248073011832291391', name: 'PILOTO SAER' },
    { id: '1248073011832291392', name: 'ATIRADOR SAER' },
    { id: '1248073011832291393', name: 'PQD SAER' }
];

const client = new Client({ 
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MEMBERS
    ]
});

module.exports = {
    data: new SlashCommandBuilder()
        .setName("att-hierarquia2")
        .setDescription("Atualiza Hierarquia SAER"),

    async execute(interaction) {
        // Verifica se o comando já está em execução
        if (isExecuting) {
            await interaction.reply({ content: "O comando já está em execução. Por favor, aguarde a finalização.", ephemeral: true });
            return;
        }

        isExecuting = true;

        // Envia uma resposta inicial
        await interaction.reply({ content: "Atualizando a hierarquia, por favor, aguarde...", ephemeral: true });

        try {
            const { guild } = interaction.member;
            // Supondo que AtualizarSaer seja uma função externa ou seja definida mais adiante no código
            const messages = await AtualizarSaer(guild);
            await interaction.followUp({ content: "Hierarquia atualizada com sucesso.", ephemeral: true });
            for (const msg of messages) {
                await interaction.channel.send(msg);
            }
        } catch (error) {
            console.error(error);
            await interaction.followUp({ content: "Ocorreu um erro ao atualizar a hierarquia.", ephemeral: true });
        } finally {
            isExecuting = false;
        }
    }
};

client.once('ready', () => {
    console.log(`Bot conectado como ${client.user.tag}`);
});

client.on('messageCreate', async message => {
    if (message.content.startsWith('!list_members')) {
        const args = message.content.split(' ');
        if (args.length < 2) {
            message.channel.send('Por favor, forneça o nome do cargo.');
            return;
        }
        
        const roleName = args.slice(1).join(' ');
        const role = roles.find(r => r.name.toLowerCase() === roleName.toLowerCase());

        if (!role) {
            message.channel.send(`Não consegui encontrar o cargo com nome: ${roleName}`);
            return;
        }

        const guild = client.guilds.cache.get(GUILD_ID);
        if (!guild) {
            message.channel.send(`Não consegui encontrar o servidor com ID: ${GUILD_ID}`);
            return;
        }

        const discordRole = guild.roles.cache.get(role.id);
        if (!discordRole) {
            message.channel.send(`Não consegui encontrar o cargo com ID: ${role.id}`);
            return;
        }

        const membersWithRole = guild.members.cache.filter(member => member.roles.cache.has(role.id));
        if (membersWithRole.size > 0) {
            const memberNames = membersWithRole.map(member => member.user.username).join('\n');
            message.channel.send(`Membros com o cargo ${discordRole.name}:\n${memberNames}`);
        } else {
            message.channel.send(`Nenhum membro encontrado com o cargo ${discordRole.name}`);
        }
    }
});

client.login(TOKEN);
