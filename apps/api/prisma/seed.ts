import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const business = await prisma.business.upsert({
    where: { id: 'default' },
    update: {
      name: 'Demo Coffee Shop',
      userId: 'demo-user'
    },
    create: {
      id: 'default',
      name: 'Demo Coffee Shop',
      userId: 'demo-user'
    }
  })

  await prisma.aISettings.upsert({
    where: { businessId: business.id },
    update: {
      provider: 'GROQ',
      model: 'llama-3.1-8b-instant',
      systemPrompt: 'Kamu adalah asisten customer service Demo Coffee Shop. Jawab ramah, singkat, dan hanya berdasarkan informasi bisnis yang tersedia.',
      temperature: 0.5,
      maxTokens: 256,
      handoffKeywords: ['admin', 'cs', 'manusia', 'komplain', 'refund']
    },
    create: {
      businessId: business.id,
      provider: 'GROQ',
      model: 'llama-3.1-8b-instant',
      systemPrompt: 'Kamu adalah asisten customer service Demo Coffee Shop. Jawab ramah, singkat, dan hanya berdasarkan informasi bisnis yang tersedia.',
      temperature: 0.5,
      maxTokens: 256,
      handoffKeywords: ['admin', 'cs', 'manusia', 'komplain', 'refund']
    }
  })

  const faqs = [
    {
      question: 'Jam buka toko?',
      answer: 'Kami buka setiap hari pukul 08.00 sampai 22.00 WIB.',
      keywords: ['jam', 'buka', 'operasional', 'tutup']
    },
    {
      question: 'Di mana lokasi toko?',
      answer: 'Lokasi kami di Jakarta Selatan. Detail alamat bisa dikirim oleh admin jika pelanggan ingin datang langsung.',
      keywords: ['lokasi', 'alamat', 'maps', 'toko']
    },
    {
      question: 'Apa menu rekomendasi?',
      answer: 'Menu favorit pelanggan adalah Es Kopi Susu Aren, Americano, dan Croissant Butter.',
      keywords: ['menu', 'rekomendasi', 'kopi', 'croissant']
    }
  ]

  for (const faq of faqs) {
    const existing = await prisma.fAQ.findFirst({
      where: {
        businessId: business.id,
        question: faq.question
      }
    })

    if (existing) {
      await prisma.fAQ.update({
        where: { id: existing.id },
        data: faq
      })
    } else {
      await prisma.fAQ.create({
        data: {
          ...faq,
          businessId: business.id
        }
      })
    }
  }

  const conversation = await prisma.conversation.upsert({
    where: {
      customerPhone_businessId: {
        customerPhone: '6281200000000@s.whatsapp.net',
        businessId: business.id
      }
    },
    update: {
      status: 'BOT_ACTIVE',
      lastMessageAt: new Date(),
      updatedAt: new Date()
    },
    create: {
      customerPhone: '6281200000000@s.whatsapp.net',
      businessId: business.id,
      status: 'BOT_ACTIVE'
    }
  })

  const messageCount = await prisma.message.count({
    where: { conversationId: conversation.id }
  })

  if (messageCount === 0) {
    await prisma.message.createMany({
      data: [
        {
          conversationId: conversation.id,
          direction: 'INBOUND',
          content: 'Halo, toko buka jam berapa?'
        },
        {
          conversationId: conversation.id,
          direction: 'OUTBOUND',
          content: 'Halo! Kami buka setiap hari pukul 08.00 sampai 22.00 WIB.'
        }
      ]
    })
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (error) => {
    console.error(error)
    await prisma.$disconnect()
    process.exit(1)
  })
