require('dotenv').config()

const { Client, SlashCommandBuilder, GatewayIntentBits } = require('discord.js')

let isExecuting = false

const client = new Client({
  intents: [
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
  ],
})
client.login(process.env.TOKEN)

const REQUIRED_ROLE_ID = '1248073011802931204'

module.exports = {
  data: new SlashCommandBuilder()
    .setName('att-hierarquia')
    .setDescription('Atualiza Hierarquia SAER'),

  async execute(interaction) {
    // Verifica se o usuário tem o cargo necessário
    if (!interaction.member.roles.cache.has(REQUIRED_ROLE_ID)) {
      await interaction.reply({
        content: 'Você não tem permissão para usar este comando.',
        ephemeral: true,
      })
      return
    }

    // Verifica se o comando já está em execução
    if (isExecuting) {
      await interaction.reply({
        content:
          'O comando já está em execução. Por favor, aguarde a finalização.',
        ephemeral: true,
      })
      return
    }

    isExecuting = true

    // Envia uma resposta inicial
    await interaction.reply({
      content: 'Atualizando a hierarquia, por favor, aguarde...',
      ephemeral: true,
    })

    try {
      const { guild } = interaction.member

      const messages = await AtualizarSaer(guild)
      await interaction.followUp({
        content: 'Hierarquia atualizada com sucesso.',
        ephemeral: true,
      })
      for (const msg of messages) {
        await interaction.channel.send(msg)
      }
    } catch (error) {
      console.error(error)
      await interaction.followUp({
        content: 'Ocorreu um erro ao atualizar a hierarquia.',
        ephemeral: true,
      })
    } finally {
      isExecuting = false
    }
  },
}

async function AtualizarSaer(canal) {
  const guild = client.guilds.cache.get(canal.id)

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
    { id: '1248073011832291393', name: 'PQD SAER' },
  ]

  let messages = []

  await guild.roles.fetch()
  await guild.members.fetch()
  const rolesGuild = guild.roles.cache
  roles.forEach((desiredRole) => {
    const role = rolesGuild.get(desiredRole.id)
    const membersWithRole = guild.members.cache.filter((member) =>
      member.roles.cache.has(role.id)
    )
    const members = membersWithRole
      .map((member) => `<@${member.id}>`)
      .join('\n>> ')
    messages.push({
      content: `\`- 👮『 ${role.name} 』- ${membersWithRole.size}\` `,
    })
    if (members) {
      messages.push('>> ' + members)
    }
  })

  const cargoID = '1248073011823906883' // ID do cargo que você quer incluir no final da mensagem

  messages.push(
    `**✪ ❱ Hierarquia Atualizada na data de: ${new Date().toLocaleDateString()} \n✪ ❱ Total Membros: ${
      guild.members.cache.filter((x) =>
        x.roles.cache.has(cargoID)
      ).size
    } \n✪ ❱ Cargo: <@&${cargoID}>**`
  )

  return messages
}
