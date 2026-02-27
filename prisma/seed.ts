import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    // 1. 既存データを一掃（データの重複やエラーを防ぐため）
    await prisma.booking.deleteMany();
    await prisma.studio.deleteMany();
    await prisma.user.deleteMany();

    // 2. スタジオ（店舗）データの定義
    // 今後、店舗を増やしたい場合はこの [ ] の中に { } を追加してください。
    const studios = [
        {
            name: 'JOCOLLA 渋谷店',
            room: 'Aスタジオ',
            pricePerHour: 2000,
            startOffset: 0,        // 0分スタート
            bookingLimitMonths: 1  // 1ヶ月先まで予約可能
        },
        {
            name: 'JOCOLLA 渋谷店',
            room: 'Bスタジオ',
            pricePerHour: 1800,
            startOffset: 30,       // 30分スタート
            bookingLimitMonths: 3  // 3ヶ月先まで予約可能
        },
        {
            name: 'JOCOLLA 渋谷店',
            room: 'Cスタジオ',
            pricePerHour: 1500,
            startOffset: 0,        // 0分スタート
            bookingLimitMonths: 6  // 6ヶ月先まで予約可能
        },
        // ★新しい店舗を追加したい場合は、ここに { ... } をコピーして増やせます
    ];

    console.log('🌱 データベースにスタジオ情報を登録中...');

    for (const s of studios) {
        const created = await prisma.studio.create({ data: s });
        console.log(`✅ 登録完了: ${created.room} (予約制限: ${created.bookingLimitMonths}ヶ月先まで)`);
    }

    // 3. テスト用のユーザーも1人作成
    await prisma.user.create({
        data: {
            id: 1,
            name: "テストユーザー",
            email: "test@example.com"
        }
    });

    console.log('✨ すべてのデータの種まきが完了しました！');
}

main()
    .catch((e) => {
        console.error('❌ エラーが発生しました:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });